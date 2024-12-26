# Full-Stack Teacher-Student Communication Platform

This is a student project for the Internet Application Programming course at the Faculty of Electrical Engineering, which represents full-stack platform that facilitates communication between students and teachers for individual classes. The platform includes a range of features, allowing users to schedule appointments, view professor ratings, and more.

## Features

### For Students:
- **Appointment Scheduling**: Students can choose a date and time for classes.
- **Professor Search**: Students can find professors based on subjects and view their ratings.
- **Profile Design**: Students can create and update their profiles, including profile picture, and other informations.

### For Teachers:
- **Profile Management**: Teachers can manage their profiles with subject expertise and CV.
- **Request Handling**: Teachers can request to become professors for new subjects.

### For Admin:
- **Requests Management**: Admin can see requests from teachers wishing to join the platform and approve or deny them.
- **Subject Management**: Admin can manage subject requests from teachers.
  
### Public Metrics (For Non-logged-in Users):
- **Charts & Metrics**: Display various charts, such as:
  - Number of registered users
  - Number of subjects
  - Top 10 active professors
  - Classes held each day of the week
  
## Technologies Used

- **Frontend**:
  - Angular
  - TypeScript
  - HTML
  - CSS
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB
- **Additional Libraries**:
  - **Multer** for file uploads (profile picture, CV)
  - **Bcrypt** for password encryption
  - **JavaScript Charts** for displaying metrics

## Installation and Setup

### Prerequisites:
- Node.js (version >= 14)
- MongoDB

### Steps to Run Locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. Instal dependencies for the backend:
   ```bash
   cd backend_Node
   npm install

4. Instal dependencies for the frontend:
   ```bash
   cd frontend
   npm install

6. Run the backend server:
   ```bash
   cd backend
   npm start

4. Run the frontend application:
   ```bash
   cd frontend
   npm serve

