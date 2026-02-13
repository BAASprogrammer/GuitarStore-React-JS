# 🎸 GuitarStore - Tienda de Guitarras Online

Tienda de guitarras moderna y responsiva desarrollada con React. Ofrece una experiencia de compra completa con catálogo de productos, carrito funcional, validación de formularios y soporte para modo oscuro/claro.

---

## 🌟 Características Principales

✨ **Catálogo de Productos**
- 4 categorías: Clásicas, Acústicas, Eléctricas y Bajos
- Filtrado dinámico por categoría
- Información detallada de cada guitarra (nombre, descripción, precio)

🛒 **Carrito de Compras Avanzado**
- Agregar/eliminar productos
- Controles de cantidad (+/-)
- Cálculo automático de totales
- Contador de items en el carrito
- Vaciar carrito completo

🌓 **Modo Obscuro/Claro**
- Cambio de tema en tiempo real sin recargar
- Persistente y nativamente integrado
- Diseño optimizado para ambos modos

📝 **Formulario de Contacto**
- Validación robusta de campos
- Mensajes de error dinámicos
- Estilos glassmorphism moderno
- Fondos animados nítidos y vibrantes

📱 **Diseño Responsivo**
- Totalmente responsive desde móvil hasta desktop
- 5 breakpoints optimizados (1366px, 1024px, 768px, 576px, 423px)
- Navegación intuitiva en todos los tamaños

♿ **Accesibilidad**
- Atributos ARIA implementados
- Alt text en imágenes
- Navegación por teclado
- Jerrarquía semántica correcta

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnologías |
|-----------|------------|
| **Frontend** | React 18.2, React Router DOM 6 |
| **Estilos** | CSS3 (Variables CSS, Flexbox, Grid) |
| **Iconos** | FontAwesome, React Icons |
| **Build** | Create React App, ES6+ |

---

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm (incluido con Node.js)
- Git (opcional, para clonar)

---

## 🚀 Instalación y Uso

### 1. **Clonar o descargar el repositorio**
```bash
git clone https://github.com/BAASprogrammer/GuitarStore-React-JS.git
cd GuitarStore-React-JS/frontend
```

### 2. **Instalar dependencias**
```bash
npm install
```

### 3. **Ejecutar en desarrollo**
```bash
npm start
```
La aplicación se abrirá en `http://localhost:3000`

### 4. **Build para producción**
```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/                 # Archivos estáticos
│   ├── index.html         # Punto de entrada HTML
│   └── manifest.json      # Manifest PWA
├── src/
│   ├── assets/
│   │   ├── css/           # Estilos globales y por página
│   │   └── images/        # Imágenes (header, home, products)
│   ├── contexts/
│   │   └── ColorProvider.jsx    # Context para tema oscuro/claro
│   ├── pages/
│   │   ├── Home.jsx       # Página principal con hero y productos
│   │   ├── Products.jsx   # Listado y filtrado de guitarra
│   │   ├── Contact.jsx    # Formulario de contacto con validación
│   │   └── About.jsx      # Información de la empresa
│   ├── components/
│   │   ├── Header.jsx     # Encabezado con navegación
│   │   ├── Footer.jsx     # Pie de página
│   │   ├── cart/          # Componentes del carrito de compras
│   │   │   ├── CartItem.jsx     # Elemento individual del carrito
│   │   │   ├── CartHeader.jsx   # Encabezado de la tabla del carrito
│   │   │   ├── CartFooter.jsx   # Pie del carrito con total y acciones
│   │   │   └── EmptyCart.jsx    # Mensaje para carrito vacío
│   │   ├── ConfirmModal.jsx   # Modal reutilizable para confirmaciones
│   │   ├── Menu.jsx       # Menú de navegación
│   │   ├── Switch.jsx     # Toggle dark/light mode
│   │   └── ...
│   ├── hooks/
│   │   └── useCurrency.js # Hook personalizado para formateo de moneda CLP
│   ├── constants/
│   │   ├── messages.js    # Mensajes centralizados para modales y notificaciones
│   │   └── cartModals.js  # Configuraciones de modales reutilizables
│   ├── data/
│   │   └── guitars.json   # Datos de productos estáticos
│   └── App.jsx            # Componente principal y ruteo
└── package.json           # Dependencias del proyecto
```

---

## 🎨 Características de Diseño

### **Sistema de Variables CSS**
- Paleta de colores consistente
- Espaciado estandarizado
- Sombras y efectos predefinidos
- Clases utilitarias para flexbox, grid y alineación

### **Temas**
- **Light Theme**: Colores claros y cálidos (naranja #FF7E00 como primario)
- **Dark Theme**: Fondos oscuros con contraste optimizado

### **Efectos Visuales**
- Gradientes suaves en secciones principales
- Efecto glassmorphism en formularios
- Animaciones de hover en botones e iconos
- **Atmospheric Swarm**: Elementos decorativos (notas, guitarras) con movimiento autónomo y fluido
- Desplazamiento suave (**Smooth Scroll**) con márgenes optimizados

---

## 🚀 Características Avanzadas

### **Sistema de Carrito Inteligente**
- **Límites de Cantidad**: Máximo 10 unidades por producto con validación automática
- **Confirmaciones Interactivas**: Modal reutilizable para eliminaciones y acciones críticas, con configuraciones separadas en `cartModals.js`
- **Formateo de Moneda**: Hook personalizado `useCurrency` para formato CLP chileno
- **Mensajes Automáticos**: Notificaciones temporales que se auto-eliminan, incluyendo confirmación de vaciado exitoso
- **Gestión de Estado**: Lógica robusta con manejo de errores y validaciones
- **Optimización de Rendimiento**: Uso de `useMemo` para cálculos de totales y `useCallback` para funciones de manejo de eventos
- **Arquitectura Modular**: Componente dividido en subcomponentes (`CartItem`, `CartHeader`, `CartFooter`, `EmptyCart`) para mejor mantenibilidad

### **Arquitectura Modular**
- **Componentes Reutilizables**: `ConfirmModal` adaptable a diferentes contextos
- **Hooks Personalizados**: `useCurrency` para lógica de negocio reutilizable
- **Constantes Centralizadas**: Mensajes y configuraciones en archivos dedicados
- **Separación de Responsabilidades**: Lógica, estilos y datos organizados

---

## 🔄 Flujo de Funcionamiento

1. **Página de Inicio (Home)**
   - Hero section con bienvenida
   - Catálogo de productos destacados
   - Sección "¿Por qué elegirnos?" con beneficios

2. **Productos**
   - Filtro por categoría
   - Agregar/quitar del carrito
   - Vista previa de detalles

3. **Carrito**
   - Modal overlay con productos agregados
   - Control de cantidades con límites (máx. 10 por producto)
   - Confirmación de eliminación con modal reutilizable
   - Cálculo automático de total con formato CLP
   - Mensajes automáticos de confirmación
   - Opción vaciar carrito con confirmación y mensaje de éxito

4. **Contacto**
   - Formulario con validación
   - Feedback de errores en tiempo real
   - Estilos glassmorphism

5. **Acerca de**
   - Información de la empresa
   - Enlaces a redes sociales

---

## 📊 Características Técnicas Destacadas

- ✅ **React Hooks**: useState, useEffect, useContext, useMemo, useCallback
- ✅ **Custom Hooks**: useCurrency para formateo de moneda CLP
- ✅ **Context API**: Gestión de temas (dark/light)
- ✅ **Componentes Reutilizables**: ConfirmModal para confirmaciones, con configuraciones separadas
- ✅ **React Router**: Navegación SPA sin recargas
- ✅ **Validación de Formularios**: Regex, validación condicional
- ✅ **CSS Variables**: Reutilización de valores de diseño
- ✅ **Clases Utilitarias**: Enfoque utility-first para layouts
- ✅ **Responsive Design**: Mobile-first y adaptable
- ✅ **Accesibilidad WCAG**: aria-labels, semantic HTML
- ✅ **Gestión Centralizada**: Mensajes y constantes organizados
- ✅ **Premium Typography**: Pairing de Outfit (cuerpo) y Oswald (títulos)

---

## 🧪 Testing

Para ejecutar tests:
```bash
npm test
```

Presionar `a` para ejecutar todos los tests.

---

## 🌐 Deployment

El proyecto está optimizado para ser desplegado en **Vercel**, **Netlify** o cualquier servicio de hosting estático.

**Vercel (recomendado):**
```bash
npm install -g vercel
vercel
```

---

## 📦 Datos y Configuración

Los datos de productos se encuentran en [`src/data/guitars.json`](frontend/src/data/guitars.json) y contienen información como:
- ID único
- Nombre y descripción
- Kategoría (clásica, acústica, eléctrica, bajo)
- Precio
- Imagen

Los mensajes y constantes centralizados están en [`src/constants/messages.js`](frontend/src/constants/messages.js), incluyendo:
- Títulos y mensajes para modales de confirmación
- Mensajes de notificación automática
- Configuraciones de límites y validaciones

Las configuraciones de modales reutilizables están en [`src/constants/cartModals.js`](frontend/src/constants/cartModals.js), permitiendo:
- Gestión centralizada de comportamientos de modales
- Fácil mantenimiento y extensión de confirmaciones

El hook personalizado `useCurrency` en [`src/hooks/useCurrency.js`](frontend/src/hooks/useCurrency.js) maneja:
- Formateo de números a moneda CLP chilena
- Configuración regional y símbolos

---

## 🤝 Contribuciones

Este es un proyecto personal. Si deseas hacer mejoras, puedes crear un fork y enviar pull requests.

---

## 📝 Licencia

Este proyecto está disponible bajo licencia MIT.

---

## 📧 Contacto

Para consultas o sugerencias sobre el proyecto:
- **Email**: contacto@guitare.com
- **Redes Sociales**: Disponibles en la página de Acerca de

---

## 👨‍💻 Autor

**BAASprogrammer** - Desarrollador del proyecto

---

**Última actualización:** Febrero 2026  
**Versión:** 2.0.0
