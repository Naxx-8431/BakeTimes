# Recipe Backend API

A RESTful API server for managing recipes with image upload functionality, built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ Full CRUD operations for recipes
- 📸 Image upload with validation
- 🔍 Search and filter recipes
- ⭐ Rating system
- 📊 Recipe statistics
- 🔒 Input validation
- 🌐 CORS enabled

## 📋 Prerequisites

Before running this server, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas account (free cloud database) - [Sign up](https://www.mongodb.com/cloud/atlas)

## 🛠️ Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Open `.env` file
   - Update `MONGODB_URI` with your MongoDB connection string:
     - For local MongoDB: `mongodb://localhost:27017/recipe-db`
     - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/recipe-db`

4. **Create uploads directory:**
   ```bash
   mkdir -p uploads/recipes
   ```

## 🏃 Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Recipes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all recipes (with optional filters) |
| GET | `/api/recipes/:id` | Get single recipe by ID |
| POST | `/api/recipes` | Create new recipe (with image) |
| PUT | `/api/recipes/:id` | Update recipe |
| DELETE | `/api/recipes/:id` | Delete recipe |
| POST | `/api/recipes/:id/rating` | Add rating to recipe |
| GET | `/api/recipes/stats` | Get recipe statistics |

### Query Parameters (GET /api/recipes)

- `category` - Filter by category (e.g., `?category=dessert`)
- `difficulty` - Filter by difficulty (e.g., `?difficulty=easy`)
- `search` - Search in title/description (e.g., `?search=chocolate`)
- `sortBy` - Sort results: `rating`, `title`, `prepTime`, `createdAt`
- `limit` - Limit results (e.g., `?limit=10`)

**Example:**
```
GET /api/recipes?category=dessert&sortBy=rating&limit=5
```

## 📝 Request Examples

### Create Recipe (POST /api/recipes)

**Using FormData (for image upload):**

```javascript
const formData = new FormData();
formData.append('title', 'Chocolate Chip Cookies');
formData.append('description', 'Delicious homemade cookies');
formData.append('ingredients', JSON.stringify([
  '2 cups flour',
  '1 cup sugar',
  '1 cup chocolate chips'
]));
formData.append('instructions', 'Mix ingredients and bake at 350°F for 12 minutes');
formData.append('prepTime', 15);
formData.append('cookTime', 12);
formData.append('servings', 24);
formData.append('difficulty', 'easy');
formData.append('category', 'dessert');
formData.append('image', imageFile); // File object

fetch('http://localhost:5000/api/recipes', {
  method: 'POST',
  body: formData
});
```

### Add Rating (POST /api/recipes/:id/rating)

```javascript
fetch('http://localhost:5000/api/recipes/507f1f77bcf86cd799439011/rating', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    rating: 4.5
  })
});
```

## 📂 Project Structure

```
server/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   └── recipeController.js   # Business logic
├── middleware/
│   └── upload.js             # File upload configuration
├── models/
│   └── Recipe.js             # Database schema
├── routes/
│   └── recipes.js            # API routes
├── uploads/
│   └── recipes/              # Uploaded images
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── server.js                # Main entry point
└── README.md                # This file
```

## 🗄️ Database Schema

```javascript
{
  title: String (required),
  description: String (required),
  ingredients: [String] (required),
  instructions: String (required),
  prepTime: Number (required),
  cookTime: Number (required),
  servings: Number (required),
  difficulty: String (enum: easy/medium/hard),
  category: String (required),
  image: String,
  author: String,
  rating: Number (0-5),
  reviewCount: Number,
  tags: [String],
  isPublished: Boolean,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running locally (`mongod` command)
- Check if `MONGODB_URI` in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

### File Upload Not Working
- Check if `uploads/recipes` directory exists
- Verify file size is under 5MB
- Ensure file type is image (jpg, png, gif, webp)

## 📄 License

ISC

## 👨‍💻 Author

Your Name

---

**Happy Coding! 🎉**
