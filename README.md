```markdown
# PC Hardware Inventory Management System

A full-stack web application designed to manage PC hardware inventory. This system features secure user authentication, complete CRUD (Create, Read, Update, Delete) capabilities, and PDF report generation, built with a React frontend and an Express.js RESTful API backend.

**Repository:** [https://github.com/Ohtashu/crud-system-hardware](https://github.com/Ohtashu/crud-system-hardware)

## Technical Stack
* **Frontend:** ReactJS, Ant Design (UI Framework), Axios, jsPDF
* **Backend:** Node.js, Express.js (RESTful API)
* **Database:** MSSQL (Microsoft SQL Server)
* **Authentication:** JSON Web Tokens (JWT)
* **Version Control:** Git & GitHub (Committed by feature)

## Project Specifications Completed
- [x] Login functionality (JWT-based authentication)
- [x] CRUD functionality (Add, View, Edit, and Delete hardware components)
- [x] Generate simple report (Export to PDF using jsPDF and autoTable)
- [x] RESTful API architecture

## How to Run and Test the Application

### Prerequisites
1. **Node.js** installed on your machine.
2. **Microsoft SQL Server** installed and running.
3. **Git** installed to clone the repository.

### Step 1: Database Setup
1. Open SQL Server Management Studio (SSMS).
2. Create a new database named `HardwareDB` (or your configured DB name).
3. Execute the provided SQL scripts in the `/db` folder to create the `Users` and `Components` tables.
4. Insert a test user into the `Users` table to allow for login testing.

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


*The server should now be running on `http://localhost:5000`.*

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

1. **Login:** Enter the credentials of the test user you created in Step 1.
2. **Create:** Click "+ Add Component" to open the Ant Design modal and add a new piece of hardware.
3. **Read:** View the newly added hardware on the dashboard grid.
4. **Update:** Click the edit icon on a hardware card to modify its details.
5. **Delete:** Click the trash can icon and confirm the Ant Design `Popconfirm` prompt to remove the item.
6. **Generate Report:** Click the "Export PDF Report" button to download a dynamically generated inventory table.
7. **Logout:** Click the red Logout button to clear your session and return to the login screen.

---

## Challenges & Development Process

I am not naturally strong with JavaScript, so I utilized an AI assistant honestly and truthfully as a pair-programmer and tutor throughout this development process. I used the AI to help me translate logic I understood from other programming concepts into modern React syntax, and to help me debug code when the application crashed.

Key technical hurdles I navigated during this project included:

* **React State & Modal Management:** Initially, the "Add Component" button was directly opening the modal without resetting the form state. This caused the form to hold onto old data if I had just closed an "Edit" session. I learned how to wire the button to a dedicated function that explicitly cleared the state (`setEditingId(null)`) and reset the form fields before rendering the UI.
* **Axios Syntax Rules:** I struggled with specific REST API syntax rules in JavaScript, such as passing `headers` instead of `header`, forgetting the template literal syntax (`${id}`) when appending variables to API routes, and properly formatting `async/await` blocks to handle network delays.
* **JSX Bracket & Layout Traps:** While building the UI, I accidentally broke the React component tree a few times by misplacing closing `</div>` tags and curly braces `}`, which caused the layout to crash or stranded functions (like the PDF generator) outside of their proper scope.
* **Integrating PDF Generation:** Implementing the "Generate Report" feature using `jsPDF` and `jspdf-autotable` was highly challenging. I ran into strict IDE formatting warnings regarding capitalized constructors, and a fatal `doc.autoTable is not a function` error because modern React build tools strictly isolate dependencies. I solved this by importing and calling the standalone `autoTable(doc, {...})` function rather than attempting to attach it directly to the `jsPDF` object.

```
