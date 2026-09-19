```markdown
# PC Hardware Inventory Management System

A full-stack web application designed to manage PC hardware inventory. This system features secure user authentication, complete CRUD (Create, Read, Update, Delete) capabilities, and PDF report generation, built with a React frontend and an Express.js RESTful API backend.

**Repository:** https://github.com/Ohtashu/crud-system-hardware

## Technical Stack
* **Frontend:** ReactJS, Ant Design (UI Framework), Axios, jsPDF
* **Backend:** Node.js, Express.js (RESTful API)
* **Database:** MSSQL (Microsoft SQL Server)
* **Authentication:** JSON Web Tokens (JWT)
* **Version Control:** Git & GitHub (committed by feature)

## Project Specifications Completed
- [x] Login functionality (JWT-based authentication)
- [x] CRUD functionality (Add, View, Edit, and Delete hardware components)
- [x] Generate simple report (Export to PDF using jsPDF and autoTable)
- [x] RESTful API architecture

---

## How to Run and Test the Application

### Prerequisites
1. **Node.js** installed on your machine.
2. **Microsoft SQL Server** installed and running.
3. **Git** installed to clone the repository.

### Step 1: Database Setup (MSSQL)
Because this system is designed strictly for admin inventory management, there is no public registration page. You must create the database and insert a test user manually using the following query.

1. Open **SQL Server Management Studio (SSMS)**.
2. Open a New Query window and execute the following SQL script to create the database, the required tables, and a default test user:

```sql
CREATE DATABASE HardwareDB;
GO

USE HardwareDB;
GO

-- Create Users Table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create Components Table
CREATE TABLE Components (
    id INT IDENTITY(1,1) PRIMARY KEY,
    hardware_name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert a default user for login testing
-- Username: admin | Password: password123
INSERT INTO Users (username, password) 
VALUES ('admin', 'password123');

```

### Step 2: Backend Setup (Express.js)

1. Open a terminal and navigate to the backend folder:
```bash
cd crud-backend

```


2. Install the required dependencies:
```bash
npm install

```


3. Configure your environment variables. Create a `.env` file in the root of the backend folder and add your MSSQL credentials and JWT Secret:
```env
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password
DB_SERVER=localhost
DB_NAME=HardwareDB
JWT_SECRET=your_super_secret_key
PORT=5000

```


4. Start the backend server:
```bash
node server.js

```


*The terminal should confirm the server is running on `http://localhost:5000` and connected to the database.*

### Step 3: Frontend Setup (ReactJS)

1. Open a new terminal window and navigate to the frontend folder:
```bash
cd crud-project

```


2. Install the frontend dependencies:
```bash
npm install

```


3. Start the React development server:
```bash
npm run dev

```


*The application will open in your browser, typically at `http://localhost:5173`.*

### Step 4: Testing the System

1. **Login:** Enter the credentials of the test user you created in Step 1 (`admin` / `password123`).
2. **Create:** Click "+ Add Component" to open the Ant Design modal and add a new piece of hardware.
3. **Read:** View the newly added hardware on the dashboard grid.
4. **Update:** Click the edit icon on a hardware card to modify its details.
5. **Delete:** Click the trash can icon and confirm the Ant Design `Popconfirm` prompt to remove the item.
6. **Generate Report:** Click the "Export PDF Report" button to download a dynamically generated inventory table.
7. **Logout:** Click the red Logout button to clear your session and return to the login screen.

---

## Challenges & Development Process

I'm still early in learning JavaScript, so I worked closely with an AI assistant throughout this project — describing what I wanted built, reviewing the code it produced, and typing it out myself to build familiarity with the syntax. I'm not yet able to write or debug this stack independently, and I want to be upfront about that rather than present the problem-solving here as more independent than it was.

Areas I leaned on AI most heavily for:

* **React state management** — resetting form state correctly so the "Add Component" modal didn't carry over stale data from a previous "Edit" session.
* **Axios / REST API syntax** — correct headers usage, template literals for dynamic routes (e.g. `${id}`), and structuring async/await calls.
* **JSX structure and component scope** — keeping closing tags and braces aligned so the component tree and functions (like the PDF generator) stayed correctly scoped.
* **PDF generation with jsPDF/autoTable** — resolving a `doc.autoTable is not a function` error by using the standalone `autoTable(doc, {...})` function instead of attaching it directly to the jsPDF instance.

```

```
