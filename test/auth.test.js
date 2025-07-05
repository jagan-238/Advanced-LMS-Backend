const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../app');
const User = require('../models/user.model'); 

dotenv.config();
jest.setTimeout(20000); // Allow more time for Atlas

const testEmail = "teja";
const testPassword = "teja123";

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas for testing");

    // ✅ Delete existing test user if present
    await User.deleteOne({ email: testEmail });
    console.log("🧹 Old test user deleted (if existed)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed");
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "teja",
      email: testEmail,
      password: testPassword,
      role: "instructor"
    });

    console.log("Register response:", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("userId");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: testPassword
    });

    console.log("Login response:", res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
