# Dynamic Form Application

This is a dynamic, interactive form application built with React (Vite) and Node.js/Express.

## Features
- **Dynamic Questions**: Add new questions seamlessly.
- **Recursive Sub-Questions**: Select "True/False" and choose "True" to conditionally add sub-questions nested infinitely.
- **Drag and Drop**: Reorder parent questions easily.
- **Auto-Numbering**: Hierarchical format like Q1, Q1.1, Q1.1.1 dynamically updates relative to the structure.
- **Persistent State**: The form state saves automatically utilizing Local Storage.
- **Modern Aesthetics**: Built with glassmorphism, linear gradients, and a sleek modern look.

## Project Structure
- `frontend/`: The React application initialized with Vite.
- `backend/`: The Node.js Express server configured to serve the compiled frontend.

## Setup & Run Instructions

### 1. Install & Build Frontend
Navigate into the frontend directory, install dependencies, and build the React app:
```bash
cd frontend
npm install
npm run build
```

### 2. Start Backend Server
Navigate into the backend directory, install its dependencies, and start the Express server:
```bash
cd ../backend
npm install
npm start
```
The application will be running at `http://localhost:3000`. Open this URL in your web browser.

### 3. Development Mode (Optional)
If you wish to run the app in development mode with Hot Module Reloading:
```bash
cd frontend
npm run dev
```

## Technologies Used
- Frontend: React 18, Vite, `dnd-kit` (for modern drag-and-drop), `lucide-react` (for icons).
- Backend: Node.js, Express.
- Styling: Custom Vanilla CSS featuring glassmorphic designs.
