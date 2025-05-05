const express = require('express');
const csv = require('csv-parser');
const { Readable } = require('stream');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = 3000;

// 🔗 URL de tu hoja de Google Sheets en formato CSV
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1oTG-PaDx0qs4f8CkThL2pmAV90JacvViIWxIH0Vwsh0/export?format=csv';

app.use(express.json());
app.use(express.static('public'));

// ✅ Leer contactos desde Google Sheets (soluciona fetch is not a function)
app.get('/contactos', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(SHEET_CSV_URL);
    const text = await response.text();
    const contactos = [];

    Readable.from(text)
      .pipe(csv())
      .on('data', (row) => {
        if (row.Nombre && row.Telefono) {
          contactos.push({
            Nombre: row.Nombre.trim(),
            Telefono: row.Telefono.trim()
          });
        }
      })
      .on('end', () => {
        res.json(contactos);
      });
  } catch (err) {
    console.error('❌ Error al leer Google Sheets:', err.message);
    res.status(500).json({ error: 'Error al leer la hoja de cálculo' });
  }
});

// 📲 Configurar cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  console.log('\n📱 Escaneá este código QR con tu WhatsApp:\n');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('\n✅ WhatsApp está conectado y listo.\n');
});

// ✅ Endpoint para enviar mensaje a todos los contactos
app.post('/enviar', async (req, res) => {
  const { contactos, mensaje } = req.body;

  if (!mensaje || !Array.isArray(contactos)) {
    return res.status(400).json({ status: 'Faltan datos válidos' });
  }

  try {
    for (const { Telefono, Nombre } of contactos) {
      const numero = `${Telefono}@c.us`;
      await client.sendMessage(numero, mensaje);
      console.log(`📤 Enviado a ${Nombre} (${Telefono})`);
    }

    res.json({ status: 'Mensajes enviados correctamente' });
  } catch (error) {
    console.error('❌ Error al enviar:', error.message);
    res.status(500).json({ status: 'Error al enviar mensajes' });
  }
});

client.initialize();

// 🟢 Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
