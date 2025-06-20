const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const corsOption = require("./config/corsOption");
const userRoutes = require("./routes/userRoute");
const ebookRoutes = require("./routes/ebookRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOption));



app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Welcome to eBook API");
})
app.use("/users", userRoutes);
app.use("/ebooks", ebookRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully")
    app.listen(process.env.PORT, () => {
        console.log(`port 🏃 on ${process.env.PORT}`)
    })
}).catch((err) => {
    console.error("Database connection failed!", err);
    process.exit(1);
})