```markdown
# Classroom Management App

The Classroom Management App is a comprehensive platform built using the MERN stack (MongoDB, Express.js, React, Node.js) to streamline school administration and classroom activities.

## Features

- Principal Role:
  - Add, delete, update, and view student and teacher profiles.
  - Create classes and assign them to teachers.

- Teacher Role:
  - View all assigned classes.
  - Add, delete, update, and view student information within assigned classes.

- Student Role:
  - View the list of other students.
  - View assigned classes created by the principal.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: Vercel(For frontend), Render(For Backend)

## Live Demo

Access the live version of the app [here](https://classroom-management-smoky.vercel.app/).

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- MongoDB
```
### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Parth0124/classroom-management.git
   cd classroom-management-app
   ```

2. Install dependencies for the backend and frontend:

   ```bash
   # Install backend dependencies
   cd backend
   npm install
    ```
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:

   ```bash
   # Start the backend server
   cd backend
   npm start

   # Start the frontend server
   cd frontend
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the app.

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.
