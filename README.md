```
# 📝 React Native To-Do App

A clean, modern, and fully functional **To-Do mobile app** built with **React Native (Expo)** and integrated with **Convex backend** for data storage and synchronization.
This app was developed as part of the **HNG Internship Program** frontend track.

---

## 🚀 Features

✅ **Add & Delete Tasks** – Quickly create and remove to-do items.
✅ **Mark as Completed** – Tap a the task to toggle completion status.
✅ **Persistent Theme** – Automatically saves your light/dark mode preference using AsyncStorage.
✅ **Custom Fonts** – Beautiful typography with the _Josefin Sans_ font family.
✅ **Drag & Drop Reordering** – Easily reorder tasks by dragging them (powered by `react-native-draggable-flatlist`).
✅ **Responsive Design** – Works seamlessly across Android and iOS devices.
✅ **Convex Backend (Planned)** –  used for user data syncing and task persistence.

---

## 🛠️ Tech Stack

**Frontend:**

- [React Native](https://reactnative.dev/) (Expo SDK 51)
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Draggable FlatList](https://github.com/computerjazz/react-native-draggable-flatlist)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [Expo Google Fonts (Josefin Sans)](https://docs.expo.dev/guides/using-custom-fonts/)

**State & Storage:**

- `useState`, `useEffect`, and React Context for theme management

**Backend :**

- [Convex](https://convex.dev/) for data management, synchronization, and authentication

---

## 💡 Project Structure
```

📦 todo-app
┣ 📂 app
┃ ┣ index.tsx # Home screen
┃ ┣ \_layout.tsx # Layout wrapper
┣ 📂 components
┃ ┣ TaskInput.tsx # Individual task Input
┃ ┣ TaskItem.tsx # Individual task component
┃ ┣ TaskList.tsx # Task list with drag & drop
┣ 📂 Theme
┃ ┗ 📜 ThemeContext.tsx # Dark/light theme context
┣ 📜 App.tsx # Root entry
┣ 📜 package.json
┗ 📜 README.md

````
## ⚙️ Installation & Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/todo-react-native.git
   cd todo-react-native
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

4. To build the APK (Android):

   ```bash
   eas build -p android --profile preview
   ```

---

## 🧑‍💻 Author

**Oladotun Joseph**
Frontend Developer — HNG Internship (Stage 3)
