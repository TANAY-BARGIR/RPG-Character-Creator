# 🛡️ RPG Character Creator (MERN Stack)

A full-stack web application designed to create, manage, and store RPG character stats. This project demonstrates the integration of a React frontend with a Node/Express backend and a MongoDB database.

## 📋 Features

### Frontend (React)
- **Dynamic Attribute Allocation:** Users can distribute a pool of points among Strength, Agility, and Intelligence.
- **Derived State Logic:** "Points Remaining" is automatically calculated based on current stats, preventing data desynchronization.
- **Complex State Management:** Utilizes `useReducer` to handle game logic and state transitions cleanly.
- **Real-time Updates:** The hero list updates automatically upon creation or deletion without page reloads.

### Backend (Node/Express & MongoDB)
- **RESTful API:** Implements GET, POST, and DELETE endpoints.
- **Data Persistence:** Uses MongoDB with Mongoose schemas to store characters permanently.
- **Input Validation:** Prevents saving empty or invalid character data.

## 🛠️ Tech Stack

**Client:**
- React.js (Vite)
- Hooks: `useState`, `useEffect`, `useReducer`, `useRef`, `useCallback`, `useNavigate`
- CSS3 (Dark Mode UI)

**Server:**
- Node.js
- Express.js
- Mongoose (ODM)
- CORS

**Database:**
- MongoDB (Community Server)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
1. Ensure **Node.js** is installed.
2. Ensure **MongoDB** is installed and running locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/REPO_NAME.git](https://github.com/YOUR_USERNAME/REPO_NAME.git)
cd REPO_NAME
```
### 2. Backend Setup

Navigate to the server folder, install dependencies, and start the server.

```bash
cd server
npm install
node server.js
```
The server should start on port 5000 and connect to MongoDB.

### 3. Frontend Setup

Open a new terminal, navigate to the client folder, install dependencies, and run the React app.

```bash
cd client
npm install
npm run dev
```
The application should launch in your browser (usually at http://localhost:5173).

## 🔌 API Endpoints

The backend exposes the following REST endpoints:

| Method | Endpoint           | Description                                                      |
|--------|--------------------|------------------------------------------------------------------|
| GET    | /api/heroes         | Fetch all saved characters from the database.                    |
| POST   | /api/heroes         | Save a new character. Body: `{ name, strength, agility, intelligence }` |
| DELETE | /api/heroes/:id     | Permanently remove a character by their MongoDB _id.             |

## 🧠 Key Learnings & Concepts

This project was built to master the following concepts:

### React Hooks Deep Dive:
- Replaced multiple `useState` calls with a single `useReducer` for cleaner logic.
- Used `useCallback` to prevent unnecessary function re-creations during renders.
- Used `useRef` for DOM manipulation (Auto-focusing inputs).

### MERN Architecture:
- Understanding how React (Port 5173) communicates with Express (Port 5000) using CORS and `fetch`.

### Database Operations:
- Transitioning from local array storage to a persistent MongoDB database using Mongoose Schemas.

## 📂 Project Structure
```
/
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components (StatRow)
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Fetching and Deleting
│   │   │   ├── CreateHero.jsx   # Creation
│   │   ├── App.jsx      # Route Logic
│   │   └── App.css      # Styling
├── server/           # Node Backend
│   ├── server.js        # Express App & Database Connection
│   └── package.json
└── README.md
```
## 📜 License

This project is open source and available under the MIT License.
