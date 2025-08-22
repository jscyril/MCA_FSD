# Social Networking Application

A full-stack web application that allows users to register with profile pictures and receive email confirmations. Built with React.js frontend and Node.js/Express.js backend with MySQL database.

## Features

- ✅ User Registration with Profile Picture Upload
- ✅ Email Confirmation using Nodemailer
- ✅ CRUD Operations on User Data
- ✅ RESTful API Endpoints
- ✅ Responsive Design with TailwindCSS
- ✅ File Upload Handling with Multer
- ✅ MySQL Database Integration

## Technology Stack

### Frontend

- React.js
- React Router
- TailwindCSS
- Axios (HTTP Client)
- Vite (Build Tool)

### Backend

- Node.js
- Express.js
- MySQL
- Multer (File Upload)
- Nodemailer (Email Service)
- CORS
- dotenv

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd lab_9
```

### 2. Database Setup

1. Create a MySQL database named `social_network`
2. The application will automatically create the required `users` table on first run

### 3. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=social_network

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
```

#### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in the `EMAIL_PASS` field

### 4. Frontend Setup

```bash
cd client
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

## API Endpoints

### Users API

| Method | Endpoint                | Description       | Body                                             |
| ------ | ----------------------- | ----------------- | ------------------------------------------------ |
| GET    | `/api/users`          | Get all users     | -                                                |
| GET    | `/api/users/:id`      | Get user by ID    | -                                                |
| POST   | `/api/users/register` | Register new user | FormData with name, email, phone, profilePicture |
| PUT    | `/api/users/:id`      | Update user       | FormData with name, email, phone, profilePicture |
| DELETE | `/api/users/:id`      | Delete user       | -                                                |

### Example API Usage (using curl)

#### Register a new user:

```bash
curl -X POST http://localhost:5000/api/users/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=+1234567890" \
  -F "profilePicture=@/path/to/image.jpg"
```

#### Get all users:

```bash
curl http://localhost:5000/api/users
```

## Testing with Postman/Thunder Client

1. **Register User**:

   - Method: POST
   - URL: `http://localhost:5000/api/users/register`
   - Body: form-data with fields: name, email, phone, profilePicture (file)
2. **Get Users**:

   - Method: GET
   - URL: `http://localhost:5000/api/users`
3. **Update User**:

   - Method: PUT
   - URL: `http://localhost:5000/api/users/1`
   - Body: form-data with fields to update
4. **Delete User**:

   - Method: DELETE
   - URL: `http://localhost:5000/api/users/1`

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## File Structure

```
lab_9/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Register.jsx
│   │   │   ├── UsersList.jsx
│   │   │   └── EditUser.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── uploads/            # Profile pictures storage
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env               # Environment variables
└── README.md
```

## Features Details

### 1. User Registration

- Form validation for required fields
- Profile picture upload with image preview
- Email format validation
- Phone number validation
- Duplicate email prevention

### 2. Email Confirmation

- HTML formatted emails
- Registration success notification
- User details included in email
- Professional email template

### 3. CRUD Operations

- **Create**: Register new users
- **Read**: View all users with pagination-ready design
- **Update**: Edit user information and profile picture
- **Delete**: Remove users with confirmation dialog

### 4. File Upload

- Image-only file validation
- File size limit (5MB)
- Unique filename generation
- Local storage in uploads folder
- Automatic cleanup on user deletion

## Environment Variables

| Variable    | Description         | Example             |
| ----------- | ------------------- | ------------------- |
| DB_HOST     | Database host       | localhost           |
| DB_USER     | Database username   | root                |
| DB_PASSWORD | Database password   | password123         |
| DB_NAME     | Database name       | social_network      |
| EMAIL_USER  | Gmail email address | app@gmail.com       |
| EMAIL_PASS  | Gmail app password  | abcd efgh ijkl mnop |
| PORT        | Server port         | 5000                |

## Troubleshooting

### Common Issues

1. **Email not sending**:

   - Check Gmail app password
   - Verify 2FA is enabled
   - Check spam folder
2. **Database connection error**:

   - Verify MySQL server is running
   - Check database credentials
   - Ensure database exists
3. **File upload issues**:

   - Check uploads folder permissions
   - Verify file size under 5MB
   - Ensure file is an image
4. **CORS errors**:

   - Verify CORS is configured in server
   - Check frontend API base URL
