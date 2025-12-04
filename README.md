# GRUPO 9 | Backend

### INTEGRANTES:
- Arturo Benicio Perotto
- Jonatan Quiroga

### Backend
- `Node.js`
- `Express.js`
- `MySQL2`
- `EJS` (motor de plantillas)

### Autenticación y seguridad
- `bcrypt` – Hash de contraseñas
- `express-session` – Manejo de sesiones
- `dotenv` – Variables de entorno

### Utilidades
- `cors` – Permitir peticiones desde otros origenes
- `nodemon` – Reinicio automatico durante desarrollo

# Estructura del proyecto:
```bash
📦 integrador_backend
├─ 📁 src
│  ├─ 📁 api
│  │  ├─ 📁 config
│  │  │  └─ environments.js
│  │  ├─ 📁 controllers
│  │  │  ├─ products.controllers.js
│  │  │  ├─ user.controllers.js
│  │  │  └─ view.controllers.js
│  │  ├─ 📁 database
│  │  │  └─ db.js
│  │  ├─ 📁 middlewares
│  │  │  └─ middlewares.js
│  │  ├─ 📁 models
│  │  │  ├─ product.models.js
│  │  │  └─ user.models.js
│  │  ├─ 📁 routes
│  │  │  ├─ index.js
│  │  │  ├─ product.routes.js
│  │  │  ├─ user.routes.js
│  │  │  └─ view.routes.js
│  │  └─ 📁 utils
│  │     └─ index.js
│  │
│  ├─ 📁 public
│  │  ├─ 📁 css
│  │  ├─ 📁 img
│  │  ├─ 📁 js
│  │  └─ 📁 uploads
│  │
│  └─ 📁 views
│     ├─ 📁 partials
│     ├─ consultar.ejs
│     ├─ crear.ejs
│     ├─ eliminar.ejs
│     ├─ index.ejs
│     ├─ login.ejs
│     └─ modificar.ejs
│
├─ .env
├─ .env.example
└─ .gitignore
```
# Resumen:
> Este es un backend desarrollado para el integrador de Programación III.
> Implementa un sistema CRUD completo con manejo de usuarios, autenticacion con sesiones, renderizado de vistas con EJS y conexión a base de datos MySQL.
> El proyecto permite crear, consultar, modificar y eliminar productos, además de gestionar usuarios y sesiones.

# Instalación:
```bash
git clone https://github.com/Arturooiwnl/grupo9Progra3ntegrador25Cuatri2_back.git
```
```bash
cd grupo9Progra3ntegrador25Cuatri2_back
```
```bash
npm install
```
Crear archivo `.env` basado en `.env.example`:

```bash
PORT=3000
DB_HOST="db_host"
DB_NAME="db_name"
DB_USER="db_user"
DB_PASSWORD="db_password"
SESSION_SECRET="session_secret"
```

# Ejecutar el proyecto:
```bash
npm run dev
```