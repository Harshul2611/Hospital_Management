const express = require("express");
const app = express();
const connectDB = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");
const adminRouter = require("./routes/adminRoute.js");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { getAvailableDoctors } = require("./controllers/doctorController.js");
const doctorRouter = require("./routes/doctorRoute.js");
const userRouter = require("./routes/userRoute.js");

const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Harshul Patel API working");
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
