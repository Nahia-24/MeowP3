# 🐱 MeowP3

Reproductor de música local con estética cute oscura, construido con **React**.

## ✨ Características

- ▶️ Play / Pause
- ⏭️ Siguiente / ⏮️ Anterior
- 🔁 Modo repetir
- 🔀 Modo aleatorio
- 📋 Lista de canciones
- 🔊 Control de volumen
- 🎵 Barra de progreso interactiva
- 🌙 Tema oscuro con estética kawaii

## 🎵 Canciones incluidas (dominio público)

Las canciones base son piezas clásicas cuyo copyright ha expirado:

| Canción | Compositor |
|---------|-----------|
| Gymnopedie No. 1 | Erik Satie |
| Moonlight Sonata (1st Mov.) | Ludwig van Beethoven |
| Clair de Lune | Claude Debussy |
| Nocturne Op. 9 No. 2 | Frédéric Chopin |

Fuente: Wikimedia Commons (CC / Dominio Público)

## 🚀 Inicio rápido

```bash
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Empaquetar como app de escritorio (Electron)

```bash
npm install --save-dev electron electron-builder concurrently wait-on cross-env
```

Agrega a `package.json`:
```json
{
  "main": "public/electron.js",
  "homepage": "./",
  "scripts": {
    "electron-dev": "concurrently \"cross-env BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\"",
    "electron-build": "npm run build && electron-builder"
  }
}
```

## ☁️ Conectar tu BD en la nube (uso personal)

Para usar tus propias canciones sin subirlas al repositorio público:

1. Crea una base de datos en **Firebase** o **Supabase**
2. Sube tus archivos de audio a **Firebase Storage** o **Cloudinary**
3. Crea un archivo `.env.local` (está en `.gitignore`):

```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_bucket
```

4. En `App.jsx`, reemplaza `BASE_SONGS` con una llamada a tu BD:

```js
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/songs`)
    .then(r => r.json())
    .then(data => setSongs(data));
}, []);
```

> ⚠️ **Importante:** El archivo `.env.local` nunca se sube a GitHub.
> Tu música personal permanece privada; el repositorio solo contiene las canciones de dominio público.

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

## 🛠️ Stack

- **React 18** — UI
- **CSS Variables** — Theming
- **HTML5 Audio API** — Reproducción
- **(Opcional) Electron** — App de escritorio

---

*Made with 🖤 and ≽^•⩊•^≼*
