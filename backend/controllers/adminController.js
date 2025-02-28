const validator = require("validator");
const bcrypt = require("bcrypt");
const doctorModel = require("../models/doctorModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date,
    } = req.body;

    const imageFile = req.file;

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email id" });
    }

    if (
      !name ||
      !email ||
      !password ||
      !fees ||
      !address ||
      !speciality ||
      !degree ||
      !experience ||
      !about
    ) {
      return res.json({ success: false, message: "Enter all details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const uploadFile = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = uploadFile.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      speciality,
      about,
      experience,
      degree,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "New Doctor Added" });
  } catch (error) {
    res.json({ success: false, message: message.error });
  }
};

//API for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { addDoctor, loginAdmin };
