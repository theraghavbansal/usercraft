# UserCraft 🗄️

A full-stack CRUD user management web application built with **Node.js**, **Express.js**, **MySQL**, and **EJS**. It features user creation, listing, updating with password verification, deletion, and bulk mock data generation using Faker.js.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Website-success?style=for-the-badge&logo=render)](https://usercraft.onrender.com)
[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

🔗 **Live Deployment:** [https://usercraft.onrender.com](https://usercraft.onrender.com)

---

## 🚀 Features

- **Full CRUD with MySQL**: Complete database integration using the `mysql2` driver.
- **Cloud & Local Database Support**: Seamlessly connects to local MySQL or cloud MySQL (TiDB Cloud / Aiven) with automatic TLS/SSL encryption.
- **Password Verification**: Updating user details requires verifying their existing password for security.
- **Form Method Override**: Emulates `PATCH` and `DELETE` requests directly from HTML forms using `method-override`.
- **Mock Data Generation**: Capability to seed database with realistic fake users via `@faker-js/faker`.
- **Environment Security**: Sensitive database credentials isolated via `.env` files.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) / [TiDB Cloud](https://tidbcloud.com/) (`mysql2` driver)
- **Templating Engine**: [EJS](https://ejs.co/)
- **Libraries**:
  - `@faker-js/faker` - Mock data generation
  - `method-override` - Simulating PUT/PATCH/DELETE in HTML forms
  - `dotenv` - Secure environment variable management

---

## 📋 RESTful Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Home page showing total registered user count |
| **GET** | `/user` | Display all users in a structured table |
| **GET** | `/user/add` | Form to register a new user |
| **POST** | `/user` | Create and store a new user |
| **GET** | `/user/:id/edit` | Form to edit user profile |
| **PATCH** | `/user/:id` | Update username after password check |
| **DELETE** | `/user/:id` | Delete user from database |

---

## 📂 Project Structure

```text
usercraft/
├── views/
│   ├── home.ejs            # Landing page with user count
│   ├── show-users.ejs      # Table displaying all registered users
│   ├── add.ejs             # Registration form for new users
│   └── edit.ejs            # Profile edit form with password verification
├── index.js                # Main server, routes, and MySQL connection
├── schema.sql              # MySQL database schema definition
├── style.css               # Custom stylesheet
├── package.json            # Project dependencies & scripts
├── .env.example            # Environment variables template
└── README.md               # Documentation
```

---

## ⚙️ Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/theraghavbansal/usercraft.git
   cd usercraft
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MySQL Database:**
   Log into MySQL:
   ```sql
   CREATE DATABASE Learning_app;
   USE Learning_app;
   ```
   Execute the table schema:
   ```sql
   CREATE TABLE user (
     id VARCHAR(50) PRIMARY KEY,
     username VARCHAR(50) UNIQUE,
     email VARCHAR(50) UNIQUE NOT NULL,
     password VARCHAR(50) NOT NULL
   );
   ```
   *(Or run the commands from `schema.sql`)*

4. **Configure Environment Variables:**
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=Learning_app
   PORT=3000
   ```

5. **Start the application:**
   ```bash
   npm start
   # or with nodemon:
   npx nodemon index.js
   ```

6. **Open in browser:**
   ```text
   http://localhost:3000/
   ```

---

## 👤 Author

- **Raghav Bansal**

---

## 📄 License

This project is licensed under the MIT License.
