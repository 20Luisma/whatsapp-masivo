# 📲 WhatsApp Masivo con Google Sheets

Este proyecto permite enviar mensajes de WhatsApp de forma masiva a una lista de contactos almacenada en una hoja de cálculo de Google Sheets. Está desarrollado en Node.js con una interfaz web clara, moderna y adaptable.

## 🚀 Funcionalidades

- ✅ Carga automática de contactos desde Google Sheets (formato CSV público)
- ✅ Interfaz web para visualizar los contactos
- ✅ Campo de texto para redactar un mensaje común
- ✅ Envío de mensajes a todos los contactos con un clic
- ✅ Notificación emergente visual tras cada envío
- ✅ Estética moderna basada en tonos azules tipo **Creawebes.com**

## 🧰 Tecnologías utilizadas

- Node.js
- Express
- whatsapp-web.js
- Google Sheets (como fuente de datos)
- HTML + CSS + JS
- Git + GitHub

## 📝 Requisitos

- Tener Node.js instalado
- Tener WhatsApp vinculado en el navegador
- Una hoja de cálculo pública de Google con este formato:

| Nombre | Telefono     |
|--------|--------------|
| Martín | 34611223344  |
| Laura  | 34619998877  |

> ⚠️ Asegurate de que tu hoja esté en modo “Cualquiera con el enlace puede ver” y exportable como CSV.

---

## 🛠 Instalación y uso

```bash
git clone https://github.com/20Luisma/whatsapp-masivo.git
cd whatsapp-masivo
npm install
node server.js
