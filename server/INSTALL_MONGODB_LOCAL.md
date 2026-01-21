# Install MongoDB Locally - Quick Guide

## 🔍 Why Local MongoDB?

Your network has DNS resolution issues with MongoDB Atlas (cloud). Installing MongoDB locally will:
- ✅ Avoid network/firewall issues
- ✅ Work offline
- ✅ Faster connection
- ✅ No internet dependency

---

## 📥 Download MongoDB Community Server

### **Option 1: Direct Download (Recommended)**

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Version: Select latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
   - Click **"Download"**

2. **Install MongoDB:**
   - Run the downloaded `.msi` file
   - Choose **"Complete"** installation
   - **IMPORTANT:** Check ✅ **"Install MongoDB as a Service"**
   - **IMPORTANT:** Check ✅ **"Install MongoDB Compass"** (GUI tool)
   - Click "Next" and "Install"

3. **Verify Installation:**
   - MongoDB service should start automatically
   - MongoDB Compass will be installed

---

### **Option 2: Using Chocolatey (If you have it)**

```powershell
choco install mongodb
```

---

## ✅ Verify MongoDB is Running

### **Check Service:**

1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for **"MongoDB Server"**
4. Status should be **"Running"**

### **Or via Command Line:**

```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# If not running, start it:
Start-Service MongoDB
```

---

## 🔧 Update Your `.env` File

After MongoDB is installed, update your connection string:

**Open:** `e:\MINI-PROJECT\server\.env`

**Change to:**
```env
# Local MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/recipe-db

PORT=5000
NODE_ENV=development
```

---

## 🚀 Start Your Server

```bash
cd e:\MINI-PROJECT\server
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
📊 Database Name: recipe-db
🚀 SERVER STARTED SUCCESSFULLY
```

---

## 📊 View Data with MongoDB Compass

1. **Open MongoDB Compass** (installed with MongoDB)
2. **Connection String:** `mongodb://localhost:27017`
3. Click **"Connect"**
4. You'll see your `recipe-db` database after adding recipes

---

## 🐛 Troubleshooting

### MongoDB Service Not Running

```powershell
# Start MongoDB service
net start MongoDB

# Or
Start-Service MongoDB
```

### Port 27017 Already in Use

```powershell
# Check what's using port 27017
netstat -ano | findstr :27017

# Kill the process if needed
taskkill /PID <PID> /F
```

### Connection Still Fails

Make sure:
- MongoDB service is running
- `.env` has `mongodb://localhost:27017/recipe-db`
- No firewall blocking port 27017

---

## 📝 Quick Summary

1. Download MongoDB Community Server
2. Install with "Install as Service" checked
3. Update `.env` to use `mongodb://localhost:27017/recipe-db`
4. Restart your server with `npm run dev`
5. Use MongoDB Compass to view data

**This will solve all your connection issues!** 🎉
