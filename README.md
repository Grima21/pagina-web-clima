pagina-web-clima
🌤️ Página Web del Clima
Aplicación web para consultar el clima actual y el pronóstico de los próximos días en cualquier ciudad del mundo.
Construida con React, Vite y TypeScript, usando la API de OpenWeatherMap.

🚀 Características
Búsqueda por ciudad para mostrar el clima actual.

Pronóstico de 5 días con información detallada.

Datos en tiempo real usando la API de OpenWeatherMap.

Compatibilidad móvil con diseño responsive.

Interfaz moderna y minimalista.

🛠️ Tecnologías utilizadas
⚛ React — Librería de JavaScript para la UI.

⚡ Vite — Entorno de desarrollo rápido.

📘 TypeScript — Tipado estático para mayor robustez.

🎨 CSS Modules / TailwindCSS (dependiendo de lo que uses) para los estilos.

🌦 OpenWeatherMap API — Datos meteorológicos.

📦 Instalación y uso
Clonar el repositorio:

bash
Copiar
Editar
git clone https://github.com/Grima21/pagina-web-clima.git
Entrar en la carpeta del proyecto:

bash
Copiar
Editar
cd pagina-web-clima
Instalar dependencias:

bash
Copiar
Editar
npm install
Configurar tu API Key:

Crea un archivo .env en la raíz del proyecto.

Agrega tu clave de OpenWeatherMap:

ini
Copiar
Editar
VITE_API_KEY=tu_api_key_aqui
Iniciar servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Abrir en el navegador:

arduino
Copiar
Editar
http://localhost:5173
📂 Estructura del proyecto
csharp
Copiar
Editar
pagina-web-clima/
├── public/ # Archivos estáticos
├── src/
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Páginas principales
│ ├── services/ # Lógica para consumir APIs
│ ├── App.tsx # Componente principal
│ └── main.tsx # Punto de entrada
├── .env.example # Ejemplo de variables de entorno
├── package.json
└── README.md
📸 Capturas de pantalla

📄 Licencia
Este proyecto está bajo la licencia MIT — libre para uso personal y comercial.
