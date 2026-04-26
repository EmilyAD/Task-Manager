# 🌸 Bloomly - Task Management System
**Team Name:** The In-Silico Coders  
**Topic:**  Task Management/To-Do List with Categories  

## 🔗 Deployed Links
- **Frontend:** [https://bloomlyapp.vercel.app/](https://task-manager-ten-tan-98.vercel.app/)
- **Backend API:**[ https://task-manager-c8uc.onrender.com](https://task-manager-c8uc.onrender.com)
- **GitHub Repository:** [https://github.com/EmilyAD/Task-Manager ](https://github.com/EmilyAD/Task-Manager)

## 📝 Project Overview
Bloomly is a responsive, component-based React application designed to transform mundane task management into a visual, rewarding experience. Built with Vite, the platform utilizes a unique "Digital Garden" metaphor to represent productivity and personal growth. In this ecosystem, every new task created by a user begins as a seed planted in the soil, symbolizing a goal yet to be nurtured. As users interact with their "All Tasks" and "Task by Category" views, the application tracks their progress using dynamic React state. Upon completion, these tasks "bloom" into a variety of fully grown plants, such as herbs and vibrant flowers, filling the user's dashboard with a flourishing digital harvest.


The application is structured into eight distinct views to ensure a comprehensive user journey:

`The Nursery (Add/Edit & List Views):` Where users plant their seeds, categorize their goals, and filter through their growing garden using integrated search functionality.


`The Gardener’s Toolkit (Sidebar & Theme):` A persistent navigation menu that allows for seamless travel between views, featuring a global theme toggler that shifts the environment between a bright "Daylight" mode and a tranquil "Moonlight" dark mode.


`The Harvest (Profile & Progress):` Dedicated pages where users can view their account details and analyze their productivity through visual statistics that count their successfully "bloomed" tasks.

By combining Tailwind CSS for a mobile-first, responsive design with React Router for smooth navigation, Bloomly provides a functional and aesthetically pleasing environment for users to grow their habits and harvest their achievements

## 🚀 Setup Instructions (Full Stack)

### Frontend
1. `git clone https://github.com/EmilyAD/Task-Manager`
2. `cd frontend && npm install`
3. Create a `.env` file with: `VITE_API_URL=https://task-manager-c8uc.onrender.com`
4. `npm run dev`

### Backend
1. `cd backend && npm install`
2. Create a `.env` file with:
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `PORT=5000`
3. `node server.js`

## 📡 API Documentation
### Base URL
```
https://task-manager-c8uc.onrender.com
```

---

### 🔐 Auth Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response (201):**
```json
{
  "_id": "64abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGci..."
}
```

---

#### POST `/api/auth/login`
Login and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response (200):**
```json
{
  "_id": "64abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGci..."
}
```

---

### ✅ Task Endpoints

> 🔒 Protected routes require `Authorization: Bearer <token>` header.

#### GET `/api/tasks`
Get all tasks for the logged-in user.

**Auth Required:** ✅  
**Response (200):**
```json
[
  {
    "_id": "64xyz...",
    "title": "Complete project",
    "description": "Finish the final phase",
    "status": "pending",
    "category": "Work",
    "dueDate": "2026-05-01T00:00:00.000Z",
    "userId": "64abc...",
    "createdAt": "2026-04-26T...",
    "updatedAt": "2026-04-26T..."
  }
]
```

---

#### GET `/api/tasks/:id`
Get a single task by ID.

**Auth Required:** ✅  
**Response (200):** Single task object

---

#### POST `/api/tasks`
Create a new task.

**Auth Required:** ✅  
**Request Body:**
```json
{
  "title": "My Task",
  "description": "Task description",
  "category": "Work",
  "status": "pending",
  "dueDate": "2026-05-01"
}
```

**Response (200):** Created task object

---

#### PUT `/api/tasks/:id`
Update an existing task.

**Auth Required:** ✅ (Owner only)  
**Request Body:** Any task fields to update  
**Response (200):** Updated task object

---

#### DELETE `/api/tasks/:id`
Delete a task.

**Auth Required:** ✅ (Owner only)  
**Response (200):**
```json
{ "message": "Task deleted" }
```

---


## 🛠️ Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT, bcrypt
* **Deployment:** Vercel (frontend), Render (backend)

## 👥 Team Contributions - Phase 1
Each member was responsible for two primary views and specific core features: 


| Member | Assigned Pages | Key Contributions |
| :--- | :--- | :--- |
| **Emily Abou Dehn** | Homepage & All Tasks | Landing UI, Search/Filter logic  |
| **Kinda AL Gharib** | Add/Edit Task & Task by Category | Form validation & Category filtering  |
| **May Ezzeddine** | User Profile & Progress | Developed the Global Dark Mode toggle, the Sidebar navigation button, and the User Statistics dashboard to track task completion data  |
| **Nour Al Ghadban** | Login & Register | Authentication forms & Input validation  |

## 👥 Team Members - Phase 2

| Name | Role |
|------|------|
| **Kinda Al Gahrib**  | Backend Core — Express server, routes, controllers, error handling |
| **Emily Abu  Dehn** | Database — MongoDB setup, User & Task models, relationships |
| **Nour Al Ghadban** | Authentication — Register/login, bcrypt, JWT, middleware, protected routes |
| **May Ezzeddine** | Frontend Integration — Connect React to API, replace mock data, handle token & UI |

---
## 👤 Team Contributions

### Kinda Al Gharib — Backend Core
**Phase 1:** Built the Add teask pages and Task by Category
**Phase 2:** Set up Node.js + Express server, designed RESTful API routes, implemented task controllers, and added error handling middleware.

### Emily — Database
**Phase 1:** Built the homepage, All Tasks page with animated SVG garden, task cards with growth slider.  
**Phase 2:** Set up MongoDB Atlas, designed User and Task schemas with Mongoose, established userId relationship between tasks and users, implemented full CRUD operations.

### Nour Al Ghabdan — Authentication
**Phase 1:** Built Login, Register pages with form validation.  
**Phase 2:** Implemented user registration with bcryptjs password hashing, JWT token generation on login, auth middleware to protect routes, and authorization to ensure users can only modify their own tasks.

### May Ezzeddine — Frontend Integration
**Phase 1:** Built Task Progress and Profile pages.  
**Phase 2:** Connected React frontend to the backend API using axios, replaced all mock data with real API calls, stored JWT token in localStorage, and updated UI with loading states and error messages.

---

## 🚧 Technical Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| MongoDB Atlas DNS resolution error (`ECONNREFUSED`) | Switched from `mongodb+srv://` to direct connection string format; changed DNS to Google's `8.8.8.8` |
| JWT token authentication failing after secret change | Fixed duplicate `JWT_SECRET` in `.env` file; regenerated tokens after fix |
| Plants overlapping on mobile garden view | Added `overflow-x-auto` and `minWidth: max-content` to enable horizontal scrolling |
| Hamburger menu showing on large screens | Added `lg:hidden` class to hide it on desktop; created separate top navbar for large screens |
| Category showing as `undefined` | Added `category` field to Task Mongoose schema with default value `"General"` |
| Frontend not connecting to deployed backend | Set `VITE_API_URL` environment variable pointing to Render deployment URL |

---


## 📸 Screenshots

* [Task_Manager_Applicationpdf.pdf](https://github.com/user-attachments/files/27105949/Task_Manager_Applicationpdf.pdf)
* [DarkMode.pdf](https://github.com/user-attachments/files/27106075/DarkMode.pdf)

* [Phone.pdf](https://github.com/user-attachments/files/27106132/Phone.pdf)


---


## 📄 License

This project was built for CSC443 — Spring 2026.









