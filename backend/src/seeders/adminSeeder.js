import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existingUser = await User.findOne({ email: ADMIN_EMAIL });

  if (existingUser) {
    existingUser.password = hashedPassword;
    await existingUser.save();

    console.log("Admin already existed. Password updated successfully.");
    return;
  }

  await User.create({
    email: ADMIN_EMAIL,
    password: hashedPassword,
  });

  console.log("Admin created successfully.");
};

const runSeeder = async () => {
  try {
    await connectDB();
    await seedAdmin();
    await mongoose.connection.close();
    console.log("Seeder finished.");
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

runSeeder();
