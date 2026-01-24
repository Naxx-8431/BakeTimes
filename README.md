# 🍰 Bake Times - Recipe Sharing Platform

A full-stack recipe sharing website where users can explore baking recipes, submit reviews, ask questions, and subscribe to newsletters. Features a complete admin dashboard for content management.

---

## 🔗 Live Website
**URL:** https://baketimes-frontend.onrender.com/

> **Note:** The application is hosted on Render's free tier, so the first load may take 30-60 seconds as the server spins up from sleep mode.

---

## 📋 Project Overview

**Bake Times** is a comprehensive baking recipe platform that combines a beautiful, responsive frontend with a robust backend API. The platform allows users to:

- Browse and search through various baking recipes
- View detailed recipe instructions with ingredients and cooking steps
- Submit and read reviews from the community
- Ask questions about specific recipes
- Subscribe to weekly recipe newsletters
- Explore holiday-themed recipes (Christmas, Thanksgiving, Easter)
- Learn baking basics and techniques

---

## ✨ Key Features

### 🎨 Frontend Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Semantic HTML5** - Proper use of header, main, section, nav, footer tags for accessibility
- **Interactive UI** - Smooth animations using AOS (Animate On Scroll)
- **Search Functionality** - Search recipes by name, ingredients, or techniques
- **Dynamic Content** - Recipe data loaded from MongoDB via REST API
- **Featured Recipes** - Highlighted recipes on the homepage
- **Holiday Collections** - Special recipe sections for holidays
- **Review System** - Star ratings and user testimonials
- **Q&A Section** - Ask questions about recipes
- **Newsletter Subscription** - Email subscription form

### ⚙️ Backend Features
- **RESTful API** - Built with Express.js
- **MongoDB Database** - NoSQL database for storing recipes, reviews, subscribers, and Q&A
- **File Upload** - Multer middleware for recipe image uploads
- **CORS Enabled** - Cross-Origin Resource Sharing for API access
- **Environment Variables** - Secure configuration using dotenv
- **Admin Dashboard** - Full CRUD operations for recipes and content moderation

### 🛡️ Admin Panel
- **Recipe Management** - Add, edit, and delete recipes
- **Review Moderation** - Approve, reject, feature, or delete user reviews
- **Subscriber Management** - View and manage newsletter subscribers
- **Q&A Management** - View and manage user questions
- **Statistics Dashboard** - View counts for reviews, subscribers, and questions
- **Image Upload** - Upload recipe images directly from the admin panel

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with responsive design
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **AOS Library** - Scroll animations
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📁 Project Structure

```
MINI-PROJECT/
├── Admin/
│   ├── Admin-control.html      # Admin dashboard
│   └── scripts/
│       └── admin-control.js    # Admin panel logic
├── scripts/
│   ├── api-integration.js      # API helper functions
│   ├── config.js               # API configuration
│   ├── home-Page-api.js        # Homepage API calls
│   ├── recipe-api.js           # Recipe page API calls
│   ├── holidays-api.js         # Holiday recipes API
│   ├── reviews-api.js          # Reviews API integration
│   ├── subscription-api.js     # Newsletter subscription
│   ├── qa-api.js               # Q&A API integration
│   └── header.js               # Header navigation
├── server/
│   ├── server.js               # Express server
│   ├── models/                 # Mongoose models
│   │   ├── Recipe.js
│   │   ├── Review.js
│   │   ├── Subscriber.js
│   │   └── QA.js
│   ├── controllers/            # Route controllers
│   │   └── recipeController.js
│   ├── middleware/
│   │   └── upload.js           # Multer configuration
│   └── uploads/                # Uploaded images
├── styles/
│   ├── general.css             # Global styles
│   ├── header.css              # Header styles
│   └── styles.css              # Homepage styles
├── tumbnail-images/            # Static images
├── index.html                  # Homepage
├── recipes.html                # All recipes page
├── recipe-template.html        # Individual recipe page
├── holidays.html               # Holiday recipes
├── reviews.html                # Reviews page
├── bakingbasics.html           # Baking basics guide
└── README.md                   # This file
```

---

## 🚀 Deployment

This project is deployed on **Render**:
- **Frontend:** Static site hosting on Render
- **Backend:** Node.js server on Render
- **Database:** MongoDB Atlas (cloud database)

The free tier on Render may cause the server to sleep after inactivity. The first request after sleep will take 30-60 seconds to wake up the server.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naxx-8431/BakeTimes.git
   cd BakeTimes
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start the MongoDB server** (if using local MongoDB)
   ```bash
   mongod
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   
   The server will run on `http://localhost:5000`

6. **Open the frontend**
   
   Open `index.html` in your browser or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

---

## 📡 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe (with image upload)
- `DELETE /api/recipes/:id` - Delete recipe

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Submit a review
- `PATCH /api/reviews/:id/approve` - Approve review
- `PATCH /api/reviews/:id/reject` - Reject review
- `PATCH /api/reviews/:id/feature` - Feature review
- `DELETE /api/reviews/:id` - Delete review

### Subscribers
- `GET /api/subscribers` - Get all subscribers
- `POST /api/subscribers` - Add subscriber
- `DELETE /api/subscribers/:id` - Delete subscriber

### Q&A
- `GET /api/qa` - Get all questions
- `POST /api/qa` - Submit a question
- `DELETE /api/qa/:id` - Delete question

---

## 🎯 Features in Detail

### Recipe Management
- Add recipes with title, description, ingredients, instructions
- Upload recipe images
- Set difficulty level (easy, medium, hard)
- Categorize recipes (dessert, main course, appetizer, etc.)
- Tag recipes for holidays
- Mark recipes as featured

### Review System
- 5-star rating system
- Text reviews
- Admin moderation (approve/reject)
- Featured reviews on homepage
- Review statistics

### Admin Dashboard
- Centralized content management
- Real-time statistics
- Bulk operations
- Responsive admin interface

---

## 🌟 Upcoming Features
- User authentication and profiles
- Recipe favorites and bookmarks
- Advanced search filters
- Recipe ratings and sorting
- Comment system for recipes
- Social media sharing
- Print-friendly recipe cards

---

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing
This is a personal learning project. While contributions are not actively sought, feedback and suggestions are always welcome!

---

## 📄 License
This project is for educational purposes only.

---

## 👤 Author
**Naxx-8431**
- GitHub: [@Naxx-8431](https://github.com/Naxx-8431)
- Website: [Bake Times](https://baketimes-frontend.onrender.com/)

---

## 🙏 Acknowledgments
- Font Awesome for icons
- AOS library for animations
- Google Fonts for typography
- MongoDB for database solutions
- Express.js community

---

## 📝 Notes
This project is continuously being updated as I learn new web development skills and best practices. The codebase follows semantic HTML5 standards for improved accessibility and SEO.

**Last Updated:** January 2026
