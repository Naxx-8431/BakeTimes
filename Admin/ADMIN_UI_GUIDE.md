# 🎨 Admin UI - Quick Test Guide

## ✅ Your Admin UI is Ready!

I've completely updated your Admin UI to work with the MongoDB backend!

---

## 🚀 How to Use the Admin UI

### **1. Make Sure Server is Running**

Your backend server should be running. Check the terminal - you should see:
```
✅ MongoDB Connected: localhost
📊 Database Name: recipe-db
🚀 SERVER STARTED SUCCESSFULLY
```

If not running, start it:
```bash
cd e:\MINI-PROJECT\server
npm run dev
```

---

### **2. Open the Admin UI**

**Double-click** this file to open in your browser:
```
e:\MINI-PROJECT\Admin\Admin-control.html
```

Or right-click → Open with → Your Browser

---

### **3. Add Your First Recipe**

Fill in the form with these example values:

- **Recipe Title:** Chocolate Chip Cookies
- **Description:** Classic homemade chocolate chip cookies that are crispy on the outside and chewy on the inside
- **Ingredients:** (one per line)
  ```
  2 cups all-purpose flour
  1 cup butter, softened
  3/4 cup granulated sugar
  3/4 cup brown sugar
  2 large eggs
  2 cups chocolate chips
  1 tsp vanilla extract
  1 tsp baking soda
  1/2 tsp salt
  ```
- **Cooking Instructions:** Preheat oven to 350°F. Cream together butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Fold in chocolate chips. Drop spoonfuls onto baking sheet. Bake for 10-12 minutes until golden brown.
- **Prep Time:** 15
- **Cook Time:** 12
- **Servings:** 48
- **Difficulty:** Easy
- **Category:** Dessert
- **Recipe Image:** Choose any image file from your computer (JPG, PNG, etc.)
- **Author:** Your Name (optional)
- **Tags:** chocolate, cookies, dessert, baking (optional)

Click **"Add Recipe"** button!

---

### **4. What Happens**

1. ✅ Form data is sent to backend API
2. ✅ Image is uploaded to `server/uploads/recipes/`
3. ✅ Recipe is saved to MongoDB database
4. ✅ You'll see "✅ Recipe added successfully!" message
5. ✅ Recipe appears in the table below
6. ✅ Form resets for next recipe

---

### **5. View Your Recipe**

After adding, you'll see your recipe in the table with:
- **Image thumbnail**
- **Title**
- **Category tag**
- **Difficulty tag**
- **Total time** (prep + cook)
- **Delete button**

---

### **6. Delete a Recipe**

Click the **"Delete"** button next to any recipe to remove it from the database.

---

### **7. Refresh the List**

Click **"Refresh List"** button to reload recipes from the database.

---

## 🔍 Verify in MongoDB Compass

1. **Open MongoDB Compass**
2. **Connect to:** `mongodb://localhost:27017`
3. **Navigate to:** `recipe-db` → `recipes` collection
4. **You'll see** your recipe data with all fields!

---

## 📊 View Uploaded Images

Your uploaded images are stored in:
```
e:\MINI-PROJECT\server\uploads\recipes\
```

They're accessible via:
```
http://localhost:5000/uploads/recipes/recipe-1234567890-abc.jpg
```

---

## 🎯 What's Different from Before

### **Old System (localStorage):**
- ❌ Data stored only in browser
- ❌ Lost when clearing browser data
- ❌ No image upload
- ❌ Limited fields

### **New System (MongoDB Backend):**
- ✅ Data stored in database
- ✅ Persistent across browsers
- ✅ Image upload support
- ✅ Full recipe schema (15+ fields)
- ✅ RESTful API integration
- ✅ Professional backend

---

## 🐛 Troubleshooting

### "Error loading recipes. Make sure the server is running!"
**Solution:** Start the backend server:
```bash
cd e:\MINI-PROJECT\server
npm run dev
```

### "Failed to fetch" or CORS error
**Solution:** Make sure:
1. Server is running on port 5000
2. You're opening the HTML file (not running on a different port)
3. CORS is enabled in server (already configured)

### Image not uploading
**Solution:** 
1. Check file size (max 5MB)
2. Check file type (JPG, PNG, GIF, WebP only)
3. Check server console for errors

---

## 📝 API Endpoints Used

The Admin UI uses these backend endpoints:

- `GET http://localhost:5000/api/recipes` - Load all recipes
- `POST http://localhost:5000/api/recipes` - Add new recipe
- `DELETE http://localhost:5000/api/recipes/:id` - Delete recipe

---

**Your Admin UI is fully integrated with MongoDB!** 🎉

Add some recipes and see them appear in the database!
