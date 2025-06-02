# 📈 Mini Habit Tracker

A modern and elegant application for daily habit tracking, built with **Svelte 5** and **TypeScript**, following **SOLID** principles and best development practices.

## ✨ Features

- 🎯 **Habit Management**: Add, delete, and mark habits as completed
- 📅 **Calendar View**: Visualize the last 14 days with visual progress indicators
- 🔥 **Streak Tracking**: Automatically counts consecutive days of compliance
- 📊 **Detailed Statistics**: Progress metrics and completion rates
- 🌙 **Dark/Light Theme**: Adaptable interface with preference persistence
- 💾 **Data Export**: Download your data in JSON format
- 📱 **Responsive Design**: Works perfectly on mobile and desktop
- 🎨 **Modern Interface**: Glassmorphism design with smooth animations
- ♿ **Accessible**: Complies with web accessibility standards

## 🏗️ Architecture

The project is structured following **SOLID principles** for maximum maintainability and scalability:

### 📁 File Structure

```
src/
├── lib/
│   ├── components/           # Reusable components
│   │   ├── CalendarGrid.svelte
│   │   ├── ExportButton.svelte
│   │   ├── HabitCard.svelte
│   │   ├── HabitForm.svelte
│   │   ├── StatsSection.svelte
│   │   └── ThemeToggle.svelte
│   ├── services/            # Business logic
│   │   ├── exportService.ts
│   │   ├── habitService.ts
│   │   └── storageService.ts
│   ├── stores/              # Global state
│   │   ├── habitStore.ts
│   │   └── themeStore.ts
│   ├── types/               # TypeScript definitions
│   │   └── habit.ts
│   └── utils/               # Utilities
│       ├── dateUtils.ts
│       └── statsUtils.ts
├── routes/                  # SvelteKit pages
│   ├── +layout.svelte
│   └── +page.svelte
└── app.css                  # Global styles
```

### 🔧 SOLID Principles Applied

1. **Single Responsibility Principle (SRP)**
   - Each class and component has a specific responsibility
   - `HabitService` handles habit operations
   - `StorageService` manages persistence
   - `DateUtils` handles date operations

2. **Open/Closed Principle (OCP)**
   - Services extensible without modifying existing code
   - Components configurable via props

3. **Liskov Substitution Principle (LSP)**
   - Consistent interfaces for services
   - Interchangeable components

4. **Interface Segregation Principle (ISP)**
   - Specific TypeScript types for each domain
   - Focused component props

5. **Dependency Inversion Principle (DIP)**
   - Dependencies injected via stores
   - Decoupled services

## 🚀 Installation and Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Production preview
npm run preview

# Type checking
npm run check

# Continuous checking
npm run check:watch
```

## 🎯 Usage

1. **Add Habit**: Type the name of your habit and press "Add"
2. **Mark Completed**: Click on the calendar days to mark as completed
3. **View Statistics**: Observe your progress in the statistics section
4. **Change Theme**: Use the button in the upper right corner
5. **Export Data**: Download your data using the export button

## 🛠️ Technologies

- **Frontend**: Svelte 5 with TypeScript
- **Framework**: SvelteKit
- **Bundler**: Vite
- **Styles**: CSS3 with glassmorphism
- **Persistence**: localStorage
- **Types**: Strict TypeScript

## 📦 Technical Features

- **Svelte 5 Runes**: Modern reactive state with `$state`, `$derived`
- **Strict TypeScript**: Full typing for better DX
- **Reactive Stores**: Global state management
- **Modular Components**: Reusable and configurable
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimizations

## 🎨 Design

- **Theme**: Glassmorphism with gradients
- **Colors**: Light and dark mode
- **Animations**: Smooth transitions
- **Responsive**: Mobile-first design
- **Typography**: Segoe UI system font

## 🔄 Data States

The application automatically maintains:
- List of habits with completion dates
- Theme preferences
- Real-time calculated statistics
- Persistence in localStorage

## 📈 Tracked Metrics

- **Current streak**: Consecutive days completed
- **Completion rate**: Percentage since creation
- **Habits completed today**: Daily counter
- **Overall rate**: Average of all habits

# 📊 State Management - Mini Habit Tracker

## Table of Contents
1. [General Architecture](#general-architecture)
2. [Main Stores](#main-stores)
3. [Persistence Management](#persistence-management)
4. [Derived State](#derived-state)
5. [Data Flow](#data-flow)
6. [Design Patterns](#design-patterns)
7. [Best Practices](#best-practices)

## General Architecture

The Mini Habit Tracker application uses **Svelte Stores** as a reactive state management system, following a clean architecture with separation of responsibilities:

```
src/lib/
├── stores/           # Global application state
├── services/         # Persistence and business logic services
├── types/           # TypeScript type definitions
├── utils/           # Utilities for derived calculations
└── components/      # Components that consume the state
```

## Main Stores

### 1. HabitStore (`habitStore.ts`)

**Purpose**: Manages the main state of the application - the list of habits.

**Store Type**: `writable<Habit[]>`

**Available Methods**:

- `init()`: Initializes the store by loading data from localStorage
- `addHabit(name: string)`: Adds a new habit
- `deleteHabit(id: number)`: Deletes an existing habit
- `toggleHabit(habitId: number, date: Date)`: Toggles the completed state of a habit
- `reset()`: Resets the store by deleting all habits

```typescript
// State structure
interface Habit {
  id: number;
  name: string;
  completedDates: string[];
  createdAt: string;
}
```

**Key Features**:
- ✅ **Immutability**: Uses spread operator to create new states
- ✅ **Automatic Persistence**: Saves changes to localStorage automatically
- ✅ **Cache Management**: Clears statistics cache when necessary
- ✅ **Logging**: Logs operations for debugging

### 2. ThemeStore (`themeStore.ts`)

**Purpose**: Manages the visual theme of the application (light/dark).

**Store Type**: `writable<Theme>`

**Available Methods**:

- `init()`: Initializes the theme from localStorage or default value
- `toggle()`: Toggles between light and dark theme
- `setTheme(theme: Theme)`: Sets a specific theme

```typescript
type Theme = 'light' | 'dark';
```

**Key Features**:
- ✅ **SSR Safe**: Uses `browser` guard for DOM operations
- ✅ **DOM Sync**: Automatically synchronizes body CSS classes
- ✅ **Persistent**: Maintains preference between sessions

## Persistence Management

### StorageService (`storageService.ts`)

**Pattern**: Service Layer for persistence abstraction

**Responsibilities**:
- Secure localStorage handling with try/catch
- JSON serialization/deserialization
- Default values for error cases
- Constants for storage keys

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

**Pattern Advantages**:
- 🔄 **Interchangeable**: Easy to migrate to other persistence systems
- 🛡️ **Error Handling**: Robust error handling
- 🧪 **Testable**: Easy to mock for testing
- 📝 **Consistent**: Uniform API for all operations

## Derived State

### Computed Values with `derived`

The application uses Svelte's `derived` store to calculate real-time statistics:

```typescript
// In +page.svelte
const appStats = derived(habitStore, $habits =>
  StatsUtils.calculateAppStats($habits)
);
```

### StatsUtils (`statsUtils.ts`)

**Purpose**: Calculates metrics derived from the main state

**Calculated Metrics**:
- **Total habits**: Simple counter
- **Completed today**: Filter by current date
- **Overall completion rate**: Percentage based on the last 14 days

```typescript
interface AppStats {
  totalHabits: number;
  completedToday: number;
  overallCompletion: number;
}
```

**Completion Rate Algorithm**:
1. Takes the last 14 days
2. For each habit, considers only days after its creation
3. Calculates percentage: `(completed / possible) * 100`

## Data Flow

### 1. Initialization
```
App Start → Store.init() → StorageService.load() → Store.set(data)
```

### 2. User Interaction
```
User Action → Component Event → Store Method →
StorageService.save() → Store Update → UI Reactivity
```

### 3. Derived State
```
Store Change → derived() → StatsUtils → New Stats → UI Update
```

### Complete Example: Add Habit

```typescript
// 1. User submits form
onSubmit(habitName)

// 2. Component calls the store
habitStore.addHabit(habitName)

// 3. Store updates state
update(habits => {
  const newHabit = HabitService.createHabit(name);
  const updatedHabits = [...habits, newHabit];
  StorageService.saveHabits(updatedHabits); // Persistence
  return updatedHabits;
});

// 4. Automatic reactivity updates UI
// 5. Derived stats are recalculated automatically
```

## Design Patterns

### 1. **Custom Store Pattern**
```typescript
function createHabitStore() {
  const { subscribe, set, update } = writable<Habit[]>([]);

  return {
    subscribe,
    // custom methods
  };
}
```

### 2. **Service Layer Pattern**
- `StorageService`: Abstracts persistence
- `HabitService`: Business logic for habits
- `StatsUtils`: Calculations and metrics

### 3. **Repository Pattern**
```typescript
// StorageService acts as repository
class StorageService {
  static saveHabits(habits: Habit[]): void
  static loadHabits(): Habit[]
}
```

### 4. **Observer Pattern**
- Svelte stores implement observer automatically
- Components subscribe reactively: `$habitStore`

## Implemented Best Practices

### ✅ **Immutability**
```typescript
// ❌ Bad practice
habits.push(newHabit);

// ✅ Good practice
return [...habits, newHabit];
```

### ✅ **Separation of Concerns**
- **Stores**: Only state and basic operations
- **Services**: Persistence and business logic
- **Utils**: Calculations and transformations
- **Components**: Presentation only

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
    return []; // Safe fallback
  }
}
```

### ✅ **Cache Management**
```typescript
// Clear cache when data changes
HabitService.clearStatsCache(habitId);
```

### ✅ **Reactive Programming**
```typescript
// Reactive derived state
const appStats = derived(habitStore, $habits =>
  StatsUtils.calculateAppStats($habits)
);
```

## Advantages of this Architecture

1. **🔄 Reactive**: Automatic UI changes
2. **🧪 Testable**: Independent services
3. **🔧 Maintainable**: Clear separation of responsibilities
4. **📈 Scalable**: Easy to add new stores/services
5. **🛡️ Type Safe**: TypeScript throughout the application
6. **💾 Persistent**: State is maintained between sessions
7. **⚡ Performant**: Optimized calculations with derived stores

## Possible Future Improvements

- **State Machine**: For complex states (loading, error, success)
- **Middleware**: For logging, debugging, analytics
- **Normalization**: For complex related data
- **Time Travel**: For undo/redo operations
- **Optimistic Updates**: For better UX in asynchronous operations


## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ using Svelte 5 and SOLID principles**
