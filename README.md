<div align="center">
  <img src="public/icon.jpg" alt="MeowP3" width="100" style="border-radius: 20px"/>
  
  # MeowP3
  
  **Reproductor de música de escritorio con estética kawaii oscura**
  
  ![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
  ![Electron](https://img.shields.io/badge/Electron-28-47848f?style=flat-square&logo=electron)
  ![Node](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
  ![License](https://img.shields.io/badge/Música-CC%20%2F%20Libre-ff6eb4?style=flat-square)
</div>

---

## ✨ Características

- ▶️ Play / Pause
- ⏭️ Siguiente / ⏮️ Anterior  
- 🔁 Modo repetir
- 🔀 Modo aleatorio
- 📋 Lista de canciones
- 🔊 Control de volumen
- 🎵 Barra de progreso interactiva
- 🌙 Tema oscuro kawaii — sin fondo, flota sobre el escritorio
- 🐱 Se detectan automáticamente los `.mp3` de la carpeta `music/`

## 🛠️ Stack

| Tecnología | Uso |
|-----------|-----|
| React 18 | Interfaz de usuario |
| Electron 28 | App de escritorio (sin navegador) |
| Node.js + Express | Servidor local que lee la carpeta de música |
| HTML5 Audio API | Reproducción de audio |
| CSS Variables | Theming kawaii oscuro |

## 📁 Estructura del proyecto

```
kawaii-player/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx        # Componente principal
│   ├── App.css        # Estilos kawaii dark
│   └── index.js       # Entry point
├── package.json
└── README.md
```

## 🚀 Correr en desarrollo

**Terminal 1 — servidor de música:**
```bash
node server.js
```

**Terminal 2 — app Electron:**
```bash
npm run electron-dev
```

> La app se abre como ventana flotante sin fondo, sin navegador.

## 🎵 Canciones incluidas

Música libre de derechos de autor de [Pixabay](https://pixabay.com/music/):

| Canción | Artista |
|---------|---------|
| Pink Candy | AI Seven |
| Gummy Drive | Mvno |
| Kawaii Pop Sparkle | Nala Subrada |
| Kawaii Drops | Poorkid Music |

## ☁️ Agregar tu propia música

Solo arrastra tus archivos `.mp3` a la carpeta `public/music/` — el reproductor los detecta automáticamente sin tocar ningún archivo de código.

Para conectar una base de datos en la nube (uso personal privado), crea un `.env.local` con tus credenciales de Firebase o Supabase. Este archivo está en `.gitignore` y nunca se sube al repositorio.

---

<div align="center">
  <i>Made with 🖤 and ≽^•⩊•^≼</i>
</div>
