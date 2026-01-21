# 🚀 Quick Start Guide - Recipe Backend Server

## ✅ What's Been Created

Your complete backend server is ready with:

- ✨ **Express.js server** with CORS enabled
- 🗄️ **MongoDB integration** with Mongoose
- 📸 **Image upload** functionality with Multer
- 🔍 **Full CRUD API** for recipes
- ⭐ **Rating system** for recipes
- 📊 **Statistics endpoint**
- 🛡️ **Input validation** and error handling

---

## 📁 Files Created

```
server/
├── config/db.js              ✅ Database connection
├── controllers/recipeController.js  ✅ Business logic (8 functions)
├── middleware/upload.js      ✅ File upload config
├── models/Recipe.js          ✅ Database schema
├── routes/recipes.js         ✅ API endpoints
├── uploads/recipes/          ✅ Image storage folder
├── .env                      ✅ Environment variables
├── .gitignore               ✅ Git ignore rules
├── package.json             ✅ Dependencies installed
├── server.js                ✅ Main server file
└── README.md                ✅ Full documentation
```

---

## 🎯 Next Steps

### 1️⃣ Install MongoDB (if not already installed)

**Option A: Local MongoDB**
- Download: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud - Free)**
- Sign up: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `.env` file with your connection string

### 2️⃣ Configure Environment Variables

Open `server/.env` and update:

```env
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/recipe-db

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe-db

PORT=5000
NODE_ENV=development
```

### 3️⃣ Start the Server

**Development mode (auto-restart on changes):**
```bash
cd server
npm run dev
```

**Production mode:**
```bash
cd server
npm start
```

You should see:
```
═══════════════════════════════════════════════
🚀 SERVER STARTED SUCCESSFULLY
═══════════════════════════════════════════════
📡 Server running on: http://localhost:5000
✅ MongoDB Connected: localhost
```

---

## 🧪 Test the API

### Using Browser:
Open: http://localhost:5000

### Using Postman or Thunder Client:

**1. Create a Recipe:**
```
POST http://localhost:5000/api/recipes
Content-Type: multipart/form-data

Body (form-data):
- title: "Chocolate Chip Cookies"
- description: "Delicious homemade cookies"
- ingredients: ["2 cups flour", "1 cup sugar", "1 cup chocolate chips"]
- instructions: "Mix and bake at 350°F for 12 minutes"
- prepTime: 15
- cookTime: 12
- servings: 24
- difficulty: "easy"
- category: "dessert"
- image: [upload file]
```

**2. Get All Recipes:**
```
GET http://localhost:5000/api/recipes
```

**3. Get Single Recipe:**
```
GET http://localhost:5000/api/recipes/{id}
```

**4. Add Rating:**
```
POST http://localhost:5000/api/recipes/{id}/rating
Content-Type: application/json

{
  "rating": 4.5
}
```

---

## 📡 Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server health check |
| GET | `/api/recipes` | Get all recipes (with filters) |
| GET | `/api/recipes/stats` | Get statistics |
| GET | `/api/recipes/:id` | Get single recipe |
| POST | `/api/recipes` | Create recipe |
| PUT | `/api/recipes/:id` | Update recipe |
| DELETE | `/api/recipes/:id` | Delete recipe |
| POST | `/api/recipes/:id/rating` | Add rating |

---

## 🔧 Frameworks & Libraries Explained

### **1. Express.js** (Web Framework)
- Handles HTTP requests and responses
- Provides routing (`app.get()`, `app.post()`, etc.)
- Middleware support

### **2. MongoDB + Mongoose** (Database)
- MongoDB: NoSQL database (stores JSON-like documents)
- Mongoose: ODM (Object Data Modeling) library
- Provides schema validation and query building

### **3. Multer** (File Upload)
- Handles `multipart/form-data` (file uploads)
- Validates file types and sizes
- Stores files on disk

### **4. CORS** (Cross-Origin Resource Sharing)
- Allows frontend (different port) to access backend
- Prevents browser security errors

### **5. dotenv** (Environment Variables)
- Loads variables from `.env` file
- Keeps sensitive data out of code

### **6. nodemon** (Development Tool)
- Auto-restarts server on file changes
- Saves time during development

---

## 🎨 Connect to Frontend

In your HTML/JavaScript files, use:

```javascript
// Fetch all recipes
fetch('http://localhost:5000/api/recipes')
  .then(res => res.json())
  .then(data => {
    console.log(data.data); // Array of recipes
  });

// Create recipe with image
const formData = new FormData();
formData.append('title', 'My Recipe');
formData.append('description', 'Delicious!');
formData.append('ingredients', JSON.stringify(['flour', 'sugar']));
formData.append('instructions', 'Mix and bake');
formData.append('prepTime', 15);
formData.append('cookTime', 30);
formData.append('servings', 4);
formData.append('difficulty', 'easy');
formData.append('category', 'dessert');
formData.append('image', fileInput.files[0]);

fetch('http://localhost:5000/api/recipes', {
  method: 'POST',
  body: formData
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running
- Windows: Start MongoDB service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change port in `.env` or kill process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### File Upload Error
```
Error: ENOENT: no such file or directory, open 'uploads/recipes/...'
```
**Solution:** Directory already created! If error persists, check file permissions.

---

## 📚 Learn More

- **Express.js:** https://expressjs.com/
- **MongoDB:** https://www.mongodb.com/docs/
- **Mongoose:** https://mongoosejs.com/docs/
- **Multer:** https://github.com/expressjs/multer

---

**🎉 Your backend is ready to use! Start the server and begin testing!**
