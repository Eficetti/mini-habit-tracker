# 📈 Mini Habit Tracker

Una aplicación moderna y elegante para el seguimiento de hábitos diarios, construida con **Svelte 5** y **TypeScript** siguiendo los principios **SOLID** y las mejores prácticas de desarrollo.

## ✨ Características

- 🎯 **Gestión de Hábitos**: Agrega, elimina y marca hábitos como completados
- 📅 **Vista de Calendario**: Visualiza los últimos 14 días con indicadores visuales de progreso
- 🔥 **Seguimiento de Rachas**: Cuenta automáticamente los días consecutivos de cumplimiento
- 📊 **Estadísticas Detalladas**: Métricas de progreso y tasas de completitud
- 🌙 **Tema Oscuro/Claro**: Interfaz adaptable con persistencia de preferencias
- 💾 **Exportación de Datos**: Descarga tus datos en formato JSON
- 📱 **Diseño Responsivo**: Funciona perfectamente en móviles y escritorio
- 🎨 **Interfaz Moderna**: Diseño glassmorphism con animaciones suaves
- ♿ **Accesible**: Cumple con estándares de accesibilidad web

## 🏗️ Arquitectura

El proyecto está estructurado siguiendo los **principios SOLID** para máxima mantenibilidad y escalabilidad:

### 📁 Estructura de Archivos

```
src/
├── lib/
│   ├── components/           # Componentes reutilizables
│   │   ├── CalendarGrid.svelte
│   │   ├── ExportButton.svelte
│   │   ├── HabitCard.svelte
│   │   ├── HabitForm.svelte
│   │   ├── StatsSection.svelte
│   │   └── ThemeToggle.svelte
│   ├── services/            # Lógica de negocio
│   │   ├── exportService.ts
│   │   ├── habitService.ts
│   │   └── storageService.ts
│   ├── stores/              # Estado global
│   │   ├── habitStore.ts
│   │   └── themeStore.ts
│   ├── types/               # Definiciones TypeScript
│   │   └── habit.ts
│   └── utils/               # Utilidades
│       ├── dateUtils.ts
│       └── statsUtils.ts
├── routes/                  # Páginas SvelteKit
│   ├── +layout.svelte
│   └── +page.svelte
└── app.css                  # Estilos globales
```

### 🔧 Principios SOLID Aplicados

1. **Single Responsibility Principle (SRP)**
   - Cada clase y componente tiene una responsabilidad específica
   - `HabitService` maneja operaciones de hábitos
   - `StorageService` gestiona persistencia
   - `DateUtils` maneja operaciones de fechas

2. **Open/Closed Principle (OCP)**
   - Servicios extensibles sin modificar código existente
   - Componentes configurables mediante props

3. **Liskov Substitution Principle (LSP)**
   - Interfaces consistentes para servicios
   - Componentes intercambiables

4. **Interface Segregation Principle (ISP)**
   - Tipos TypeScript específicos para cada dominio
   - Props componentes enfocadas

5. **Dependency Inversion Principle (DIP)**
   - Dependencias inyectadas via stores
   - Servicios desacoplados

## 🚀 Instalación y Desarrollo

### Prerequisitos

- Node.js 18+ 
- npm o pnpm

### Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Preview de producción
npm run preview

# Verificación de tipos
npm run check

# Verificación continua
npm run check:watch
```

## 🎯 Uso

1. **Agregar Hábito**: Escribe el nombre de tu hábito y presiona "Agregar"
2. **Marcar Completado**: Haz clic en los días del calendario para marcar como completado
3. **Ver Estadísticas**: Observa tu progreso en la sección de estadísticas
4. **Cambiar Tema**: Usa el botón en la esquina superior derecha
5. **Exportar Datos**: Descarga tus datos usando el botón de exportar

## 🛠️ Tecnologías

- **Frontend**: Svelte 5 con TypeScript
- **Framework**: SvelteKit
- **Bundler**: Vite
- **Estilos**: CSS3 con glassmorphism
- **Persistencia**: localStorage
- **Tipos**: TypeScript estricto

## 📦 Características Técnicas

- **Runes de Svelte 5**: Estado reactivo moderno con `$state`, `$derived`, `$effect`
- **TypeScript Estricto**: Tipado completo para mejor DX
- **Stores Reactivos**: Gestión de estado global
- **Componentes Modulares**: Reutilizables y configurables
- **Progressive Enhancement**: Funciona sin JavaScript
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Performance**: Lazy loading y optimizaciones

## 🎨 Diseño

- **Tema**: Glassmorphism con gradientes
- **Colores**: Modo claro y oscuro
- **Animaciones**: Transiciones suaves
- **Responsivo**: Mobile-first design
- **Tipografía**: Segoe UI system font

## 🔄 Estados de Datos

La aplicación mantiene automáticamente:
- Lista de hábitos con fechas de completitud
- Preferencias de tema
- Estadísticas calculadas en tiempo real
- Persistencia en localStorage

## 📈 Métricas Tracked

- **Racha actual**: Días consecutivos completados
- **Tasa de completitud**: Porcentaje desde creación
- **Hábitos completados hoy**: Contador diario
- **Tasa general**: Promedio de todos los hábitos

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commitea tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ve el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ usando Svelte 5 y principios SOLID**
