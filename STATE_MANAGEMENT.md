# 📊 Manejo de Estado - Mini Habit Tracker

## Tabla de Contenidos
1. [Arquitectura General](#arquitectura-general)
2. [Stores Principales](#stores-principales)
3. [Gestión de Persistencia](#gestión-de-persistencia)
4. [Estado Derivado](#estado-derivado)
5. [Flujo de Datos](#flujo-de-datos)
6. [Patrones de Diseño](#patrones-de-diseño)
7. [Mejores Prácticas](#mejores-prácticas)

## Arquitectura General

La aplicación Mini Habit Tracker utiliza **Svelte Stores** como sistema de manejo de estado reactivo, siguiendo una arquitectura limpia con separación de responsabilidades:

```
src/lib/
├── stores/           # Estado global de la aplicación
├── services/         # Servicios de persistencia y lógica de negocio
├── types/           # Definiciones de tipos TypeScript
├── utils/           # Utilidades para cálculos derivados
└── components/      # Componentes que consumen el estado
```

## Stores Principales

### 1. HabitStore (`habitStore.ts`)

**Propósito**: Maneja el estado principal de la aplicación - la lista de hábitos.

**Tipo de Store**: `writable<Habit[]>`

**Métodos Disponibles**:

- `init()`: Inicializa el store cargando datos desde localStorage
- `addHabit(name: string)`: Agrega un nuevo hábito
- `deleteHabit(id: number)`: Elimina un hábito existente
- `toggleHabit(habitId: number, date: Date)`: Alterna el estado completado de un hábito
- `reset()`: Reinicia el store eliminando todos los hábitos

```typescript
// Estructura del estado
interface Habit {
  id: number;
  name: string;
  completedDates: string[];
  createdAt: string;
}
```

**Características Clave**:
- ✅ **Inmutabilidad**: Usa spread operator para crear nuevos estados
- ✅ **Persistencia Automática**: Guarda cambios en localStorage automáticamente
- ✅ **Cache Management**: Limpia cache de estadísticas cuando es necesario
- ✅ **Logging**: Registra operaciones para debugging

### 2. ThemeStore (`themeStore.ts`)

**Propósito**: Maneja el tema visual de la aplicación (claro/oscuro).

**Tipo de Store**: `writable<Theme>`

**Métodos Disponibles**:

- `init()`: Inicializa el tema desde localStorage o valor por defecto
- `toggle()`: Alterna entre tema claro y oscuro
- `setTheme(theme: Theme)`: Establece un tema específico

```typescript
type Theme = 'light' | 'dark';
```

**Características Clave**:
- ✅ **SSR Safe**: Usa `browser` guard para operaciones del DOM
- ✅ **DOM Sync**: Sincroniza automáticamente clases CSS del body
- ✅ **Persistent**: Mantiene preferencia entre sesiones

## Gestión de Persistencia

### StorageService (`storageService.ts`)

**Patrón**: Service Layer para abstracción de persistencia

**Responsabilidades**:
- Manejo seguro de localStorage con try/catch
- Serialización/deserialización JSON
- Valores por defecto para casos de error
- Constantes para keys de storage

```typescript
export class StorageService {
  private static readonly HABITS_KEY = 'habits';
  private static readonly THEME_KEY = 'theme';
  
  static saveHabits(habits: Habit[]): void { /* ... */ }
  static loadHabits(): Habit[] { /* ... */ }
  static saveTheme(theme: Theme): void { /* ... */ }
  static loadTheme(): Theme { /* ... */ }
}
```

**Ventajas del Patrón**:
- 🔄 **Intercambiable**: Fácil migrar a otros sistemas de persistencia
- 🛡️ **Error Handling**: Manejo robusto de errores
- 🧪 **Testeable**: Fácil de mockear para testing
- 📝 **Consistente**: API uniforme para todas las operaciones

## Estado Derivado

### Computed Values con `derived`

La aplicación utiliza el store `derived` de Svelte para calcular estadísticas en tiempo real:

```typescript
// En +page.svelte
const appStats = derived(habitStore, $habits => 
  StatsUtils.calculateAppStats($habits)
);
```

### StatsUtils (`statsUtils.ts`)

**Propósito**: Calcula métricas derivadas del estado principal

**Métricas Calculadas**:
- **Total de hábitos**: Contador simple
- **Completados hoy**: Filtro por fecha actual
- **Tasa de finalización general**: Porcentaje basado en últimos 14 días

```typescript
interface AppStats {
  totalHabits: number;
  completedToday: number;
  overallCompletion: number;
}
```

**Algoritmo de Completion Rate**:
1. Toma los últimos 14 días
2. Para cada hábito, considera solo días después de su creación
3. Calcula porcentaje: `(completados / posibles) * 100`

## Flujo de Datos

### 1. Inicialización
```
App Start → Store.init() → StorageService.load() → Store.set(data)
```

### 2. Interacción del Usuario
```
User Action → Component Event → Store Method → 
StorageService.save() → Store Update → UI Reactivity
```

### 3. Estado Derivado
```
Store Change → derived() → StatsUtils → New Stats → UI Update
```

### Ejemplo Completo: Agregar Hábito

```typescript
// 1. Usuario envía form
onSubmit(habitName)

// 2. Componente llama al store
habitStore.addHabit(habitName)

// 3. Store actualiza estado
update(habits => {
  const newHabit = HabitService.createHabit(name);
  const updatedHabits = [...habits, newHabit];
  StorageService.saveHabits(updatedHabits); // Persistencia
  return updatedHabits;
});

// 4. Reactividad automática actualiza UI
// 5. Stats derivadas se recalculan automáticamente
```

## Patrones de Diseño

### 1. **Custom Store Pattern**
```typescript
function createHabitStore() {
  const { subscribe, set, update } = writable<Habit[]>([]);
  
  return {
    subscribe,
    // métodos personalizados
  };
}
```

### 2. **Service Layer Pattern**
- `StorageService`: Abstrae persistencia
- `HabitService`: Lógica de negocio para hábitos
- `StatsUtils`: Cálculos y métricas

### 3. **Repository Pattern**
```typescript
// StorageService actúa como repository
class StorageService {
  static saveHabits(habits: Habit[]): void
  static loadHabits(): Habit[]
}
```

### 4. **Observer Pattern**
- Svelte stores implementan observer automáticamente
- Componentes se suscriben reactivamente: `$habitStore`

## Mejores Prácticas Implementadas

### ✅ **Inmutabilidad**
```typescript
// ❌ Mala práctica
habits.push(newHabit);

// ✅ Buena práctica
return [...habits, newHabit];
```

### ✅ **Separación de Responsabilidades**
- **Stores**: Solo estado y operaciones básicas
- **Services**: Persistencia y lógica de negocio
- **Utils**: Cálculos y transformaciones
- **Components**: Solo presentación

### ✅ **Type Safety**
```typescript
interface Habit {
  id: number;
  name: string;
  completedDates: string[];
  createdAt: string;
}
```

### ✅ **Error Handling**
```typescript
static loadHabits(): Habit[] {
  try {
    const saved = localStorage.getItem(this.HABITS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return []; // Fallback seguro
  }
}
```

### ✅ **Cache Management**
```typescript
// Limpia cache cuando los datos cambian
HabitService.clearStatsCache(habitId);
```

### ✅ **Reactive Programming**
```typescript
// Estado derivado reactivo
const appStats = derived(habitStore, $habits => 
  StatsUtils.calculateAppStats($habits)
);
```

## Ventajas de esta Arquitectura

1. **🔄 Reactiva**: Cambios automáticos en UI
2. **🧪 Testeable**: Servicios independientes
3. **🔧 Mantenible**: Separación clara de responsabilidades  
4. **📈 Escalable**: Fácil agregar nuevos stores/servicios
5. **🛡️ Type Safe**: TypeScript en toda la aplicación
6. **💾 Persistente**: Estado se mantiene entre sesiones
7. **⚡ Performante**: Cálculos optimizados con derived stores

## Posibles Mejoras Futuras

- **State Machine**: Para estados complejos (loading, error, success)
- **Middleware**: Para logging, debugging, analytics
- **Normalization**: Para datos relacionados complejos
- **Time Travel**: Para undo/redo operations
- **Optimistic Updates**: Para mejor UX en operaciones asíncronas 