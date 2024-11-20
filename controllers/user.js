import { getAllUser, getUserByEmail, CreateUser } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const saltrounds = 10;

export const getAllUserController = async (req, res) => {
  try {
    const allUser = await getAllUser();
    return res.status(200).json({
      valid: true,
      message: "Success Get All User",
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
      data: [],
    });
  }
};

export const CreateUserController = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const checkEmail = await getUserByEmail(email);

    if (checkEmail.length >= 1) {
      throw {
        valid: false,
        status: 401,
        message: "Email already exist",
      };
    }
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      if (err) {
        return {
          valid: false,
          status: 500,
          message: "Authentication Failed",
        };
      }

      const addData = await CreateUser({
        username: username,
        email: email,
        password: hash,
        phone: phone,
      });
      res.json({
        valid: true,
        status: 200,
        message:
          "Successfully create account!, please check your email for verfication your account",
      });
    });
  } catch (error) {
    res.json({
      valid: false,
      status: 500,
      message: error,
      data: [],
    });
  }
};
