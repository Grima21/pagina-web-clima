# 🌤️ Página Web del Clima

Aplicación web para consultar el clima actual de cualquier ciudad, utilizando la API de [OpenWeather](https://openweathermap.org/api).  
Incluye búsqueda por nombre de ciudad, geolocalización automática y diseño responsive con Tailwind CSS.

---

## 🚀 Demo

🔗 **Enlace en vivo:** [https://TU-DEPLOY.vercel.app](https://TU-DEPLOY.vercel.app)

![Captura de la app](./public/screenshot.png)

---

## ✨ Características

- 🔍 **Búsqueda de ciudad** con validación de resultados.
- 📍 **Geolocalización** automática (con permiso del usuario).
- 🌡️ Visualización de temperatura, humedad, viento e iconos meteorológicos.
- 🎨 **UI responsive** con Tailwind CSS.
- ⚡ Carga rápida gracias a Vite.

---

## 🛠️ Tecnologías utilizadas

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS**
- **OpenWeather API**

---

## 📦 Instalación y uso

Clona el repositorio:

```bash
git clone https://github.com/Grima21/pagina-web-clima
cd pagina-web-clima
npm install

VITE_OPENWEATHER_KEY=tu_api_key_aqui
VITE_API_BASE=https://api.openweathermap.org/data/2.5

npm run dev
```

## Scripts disponibles

- npm run dev → Modo desarrollo
- npm run build → Compilar para producción
- npm run preview → Previsualizar el build

## Roadmap

- Pronóstico extendido (5 días)
- Selector °C/°F con persistencia
- Tema claro/oscuro
- Historial de búsquedas recientes

## Licencia

Este proyecto esta bajo licencia MIT.
