// 1. Imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔹 Import routes
const taskRoutes = require("./routes/taskRoutes");

// 2. Create app
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes
// Test route
app.get("/test", (req, res) => {
  res.send("Test route working");
});

//  Connect task routes
app.use("/tasks", taskRoutes);

// 5. Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// 6. Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));