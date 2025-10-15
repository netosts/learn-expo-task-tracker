# 📱 Expo Learning Roadmap – Product Requirements Documents (PRD)

A 21-day practical journey to learn Expo by building 4 progressively challenging mobile apps.

---

## 🧩 Project 1 – Task Tracker

### 🎯 Objective

Build a basic two-screen task management app to learn React Native fundamentals, navigation, and local storage using AsyncStorage.

### 🧱 Requirements

#### Functional

- Add, edit, and delete tasks.
- Organize tasks by category (e.g., Work, Personal).
- Persist tasks using local storage.
- Navigate between “Tasks” and “Settings” screens.

#### Non-functional

- Offline-only (no backend).
- Simple, responsive layout compatible with Android and iOS.
- Persist data even after app reload.

### ⚙️ Tech Stack

- Expo SDK (latest)
- React Native core components
- React Navigation (stack & tab)
- AsyncStorage

### 🧠 Key Concepts

- JSX, props, and state (`useState`)
- Navigation setup and screen transitions
- AsyncStorage persistence
- Basic styling with StyleSheet API

### ✅ Specifications & Features

1. **Tasks Screen**
   - `FlatList` displaying all tasks.
   - Input to add a new task.
   - Buttons to mark tasks as done or delete.
2. **Settings Screen**
   - Toggle for dark/light mode (saved in AsyncStorage).
   - Button to clear all tasks.

### 📈 Stretch Goals

- Add due dates to tasks.
- Filter tasks by category or completion.
- Add simple animations (with Reanimated or LayoutAnimation).

---

## 📸 Project 2 – Photo Notes

### 🎯 Objective

Learn to use Expo’s device APIs to capture and store photos, manage permissions, and build a small gallery app.

### 🧱 Requirements

#### Functional

- Request camera and media permissions.
- Take photos using device camera.
- Add captions and save photos locally.
- View saved photo notes in a gallery.
- Delete or share photos.

#### Non-functional

- Handle permission denial gracefully.
- Maintain smooth camera preview.
- Store metadata (photo URI + caption) locally.

### ⚙️ Tech Stack

- Expo Camera (`expo-camera`)
- Expo Media Library (`expo-media-library`)
- Expo Sharing (`expo-sharing`)
- AsyncStorage or FileSystem

### 🧠 Key Concepts

- Device permissions (ask/check)
- Handling URIs and file paths
- Displaying local images
- Multi-screen navigation flow

### ✅ Specifications & Features

1. **Capture Screen**
   - Live camera preview.
   - Capture button (📸).
   - Text input for caption.
   - Save button.
2. **Gallery Screen**
   - Grid view of saved photos.
   - Each photo shows caption overlay.
   - Long-press to delete, tap to view/share.

### 📈 Stretch Goals

- Implement folder-based organization (tags).
- Add filters using `expo-image-manipulator`.
- Enable uploading to cloud storage (Firebase/Supabase).

---

## 🗺️ Project 3 – Local Explorer

### 🎯 Objective

Combine geolocation, mapping, and API integration to display nearby places of interest and store favorites.

### 🧱 Requirements

#### Functional

- Request location permission.
- Display user location on map.
- Fetch nearby points of interest via API.
- Display markers for each place.
- Allow saving/removing favorites.

#### Non-functional

- Use skeleton/loading states.
- Smooth map panning and marker rendering.
- Cache favorites locally.

### ⚙️ Tech Stack

- Expo Location (`expo-location`)
- React Native Maps (`react-native-maps`)
- Fetch API or Axios
- AsyncStorage

### 🧠 Key Concepts

- Geolocation and permissions
- Working with external APIs
- Rendering interactive maps
- State synchronization between components

### ✅ Specifications & Features

1. **Map Screen**
   - Display current location marker.
   - Fetch nearby locations and display as pins.
   - Tap pin → open modal or navigate to details.
2. **Details Screen**
   - Show name, coordinates, and “Save to Favorites” button.
3. **Favorites Screen**
   - List all saved locations.
   - Tap to re-center on map.

### 📈 Stretch Goals

- Add search functionality (by city or keyword).
- Cluster markers when zoomed out.
- Offline map caching.

---

## 📖 Project 4 – Devotional Journal

### 🎯 Objective

Build a connected and offline-ready app that fetches daily devotionals or Bible verses, caches them locally, and allows personal notes.

### 🧱 Requirements

#### Functional

- Fetch daily devotional or verse from an external API.
- Display today’s reading with title and content.
- Allow user to mark favorites and write personal notes.
- Store devotionals and notes locally for offline use.
- Toggle dark/light mode.

#### Non-functional

- Smooth offline/online experience.
- Save theme and user preferences.
- Handle API failure gracefully.
- Show splash screen and app icon.

### ⚙️ Tech Stack

- Expo SDK + React Native
- Fetch API or Axios
- AsyncStorage or Expo SQLite
- Expo FileSystem (optional)
- Context API or Zustand for state
- Expo Splash Screen & App Icon setup

### 🧠 Key Concepts

- Data fetching and caching
- Local storage for offline use
- Theme management and persistence
- EAS build process (APK generation)

### ✅ Specifications & Features

1. **Home Screen**
   - Fetch daily devotional/verse.
   - Display loading/error states.
   - Favorite button (⭐).
2. **Notes Screen**
   - Text input to save reflections.
   - List of all saved notes.
3. **Settings Screen**
   - Theme toggle (dark/light).
   - Button to clear cache or reset app data.

### 📈 Stretch Goals

- Push notifications for “Daily Devotional” reminders.
- Multi-language support.
- Sync notes to the cloud with Supabase.

---

## 🏁 Summary of Skills Gained

| Phase              | Core Concepts             | Key Expo Features                     |
| ------------------ | ------------------------- | ------------------------------------- |
| Task Tracker       | Layout, State, Storage    | AsyncStorage, Navigation              |
| Photo Notes        | Device APIs, Permissions  | Camera, MediaLibrary, Sharing         |
| Local Explorer     | Networking, Geolocation   | Location, Maps                        |
| Devotional Journal | Offline + API Integration | SQLite, FileSystem, Splash, EAS Build |

---

## 🚀 Recommended Tools

- **Expo Go** – For fast testing on your phone.
- **VS Code + React Native Tools** – Debugging and formatting.
- **React DevTools** – Component inspection.
- **EAS CLI** – Build and deploy your app easily.

---

## 🧭 Next Steps

After completing these 4 projects:

1. Pick your _real app idea_ and outline its PRD using this same structure.
2. Reuse code and patterns you learned.
3. Add real backend integration (Laravel API, Supabase, or Firebase).
4. Publish to Play Store or TestFlight.

---

**Author:** Silvio dos Santos Neto  
**Learning Goal:** Become production-ready with Expo and React Native in 21 days.
