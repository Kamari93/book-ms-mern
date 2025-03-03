### 📖 **Book Management System (MERN Stack)**

A simple **Book Management System** built using the **MERN stack (MongoDB, Express, React, Node.js)**. This project allows users to **add, update, delete, and view books** in a database.

Live App: https://book-ms-client.vercel.app/

## 🚀 **Features**

✅ **Add New Books** (Title, Author, Cover Image)  
✅ **View a List of Books** 📚  
✅ **Update Book Information** ✏️  
✅ **Delete Books** 🗑️  
✅ **Responsive UI** using React  
✅ **RESTful API** with Express.js  
✅ **MongoDB Database** for storing books

🔑 User Roles & Privileges
This system supports two types of users:

👨‍🏫 Admin
✅ Can add, update, and delete books.
✅ Has full access to manage the book collection.
✅ Can view all books.
✅ Has access to admin dashboard (optional feature).
🎓 Student
✅ Can view all books.
✅ Cannot add, update, or delete books.
✅ Can search and filter books (Future Enhancement).
Future Enhancement: Implement authentication using JWT & bcrypt to handle user roles securely.

---

## 🛠 **Tech Stack**

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Styling:** CSS

---

## 📦 **Installation & Setup**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/yourusername/book-management-system.git
cd book-management-system
```

### 2️⃣ **Backend Setup (Express + MongoDB)**

#### Install dependencies:

```bash
cd backend
npm install
```

#### Set up a **.env** file:

```plaintext
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### Start the backend server:

```bash
npm start
```

By default, the backend will run on **http://localhost:5000**.

---

### 3️⃣ **Frontend Setup (React)**

#### Install dependencies:

```bash
cd frontend
npm install
```

#### Start the frontend:

```bash
npm start
```

The React app will run on **http://localhost:3000**.

---

## 📚 **API Endpoints**

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/books`     | Get all books       |
| POST   | `/books/add` | Add a new book      |
| PUT    | `/books/:id` | Update book details |
| DELETE | `/books/:id` | Delete a book       |

---

## 🎯 **Next Steps & Improvements**

🔍 **Search & Filter Books**  
📂 **Add Book Categories** (e.g., Fiction, Sci-Fi)  
❤️ **Favorites Feature** (Save books to a list)  
🔐 **User Authentication** (Login/Register)  
📄 **Pagination** (Load books in pages)

---

## 🤝 **Contributing**

Feel free to fork this repository and submit pull requests! 😊
