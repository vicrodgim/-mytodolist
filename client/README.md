# TODO App

## Project Overview

A simple and interactive todo list application built with React. This app allows users to add, edit, delete, and manage tasks with sorting functionalities.

## Features

- Add, edit, and delete tasks.
- Sort tasks by date, priority, category, or alphabetically.
- Mark tasks as completed.
- Interactive tooltips for better user guidance
- Authentication and authorization using JWT and bcrypt for secure user access.
- Responsive design for mobile and desktop

## Tech Stack

### Back End

- **Node.js / Express.js** (API Server)
- **MySQL2** (Database)
- **Axios** (HTTP Requests)
- **bcrypt** (Password hashing)
- **JSON Web Tokens (JWT)** for authentication
- **dotenv** (Environment variable management)

### Front End

- **React.js**
- **React Router**
- **Axios** (for API requests)
- **CSS** for styling
- **HTML** for styling

## Installation & Setup

### Clone the Repository

```sh
git clone https://github.com/vicrodgim/-mytodolist.git
```

### Database Setup

Access MySQL in your terminal:

```sh
mysql -u root -p
```

Run the SQL scripts located in `server/data/init_db.sql` to create the database and tables.

Run database migrations:

```sh
npm run migrate
```

### Back-End Setup

Navigate to the server directory:

```sh
cd server
```

Install dependencies:

```sh
npm install
```

Create a `.env` file and add the following environment variables:

```sh
# Database Configuration
DB_HOST=localhost
DB_NAME=mytodolist
DB_USERNAME=root
DB_PASSWORD=yourpassword

# Authentication Secret
SUPER_SECRET=your_secret_key
```

Start the server:

```sh
npm run start
```

The server will run on [http://localhost:4000](http://localhost:4000)

### Front-End Setup

Navigate to the client directory:

```sh
cd client
```

Install dependencies:

```sh
npm install
```

Start the React application:

```sh
npm run dev
```

The app will run on [http://localhost:5173](http://localhost:5173)

## API Endpoints

### Authentication

- `POST /api/users/register` → Registers a new user
- `POST /api/users/login` → Logs in and returns a JWT token
- `GET /api/users/profile` → Retrieves the logged-in user's profile

### Tasks

- `GET /api/tasks` → Fetches all tasks
- `GET /api/tasks/:id` → Fetches a task based on its ID
- `POST /api/tasks` → Posts a task
- `PUT /api/tasks/:id` → Updates a task based on its ID
- `DELETE /api/tasks/:id` → Deletes a task based on its ID

### Categories

- `POST /api/categories` → Fetches all categories

## Project Structure

src
├── assets # Static assets (e.g., images, icons)
├── components # Reusable UI components
│ ├── AuthForm # Authentication components
│ │ ├── AuthLayout.jsx # Wrapper for authentication pages
│ │ ├── AuthLayout.css # Styles for authentication layout
│ │ ├── FormInput.jsx # Form input component
│ │ └── FormInput.css # Styles for form inputs
│ ├── NavBar # Navigation components
│ │ ├── NavBar.jsx # Main navigation bar
│ │ ├── NavBar.css # Styles for navigation bar
│ │ ├── NavButton.jsx # Button component for navigation
│ │ └── NavButton.css # Styles for navigation buttons
│ ├── Sorting # Sorting-related components
│ │ ├── SortBar.jsx # Sorting bar component
│ │ └── SortBar.css # Styles for sorting bar
│ ├── TaskList.jsx # Component displaying the list of tasks
├── elements # Additional reusable UI elements
├── pages # Route-based components (each corresponding to a page)
│ ├── AddTasksPage.jsx # Page for adding tasks
│ ├── AddTaskPage.css # Styles for the add tasks page
│ ├── LoginPage.jsx # Login page component
│ ├── LoginPage.css # Styles for login page
│ ├── RegisterPage.jsx # Registration page component
│ ├── RegisterPage.css # Styles for register page
│ ├── TaskDashboard.jsx # Main task dashboard
│ └── TaskDashboard.css # Styles for the dashboard
├── App.jsx # Main application component
├── App.css # Global styles
├── index.css # General styles for the app
└── main.jsx # Entry point of the application

## Usage Instructions

1. **Add a task:** Enter a task with its (optional) description, due date, priority, and category.
2. **Mark task as complete/incomplete**
3. **Sort tasks based on priority, date, and alphabetical order**
4. **Remove tasks from list**
