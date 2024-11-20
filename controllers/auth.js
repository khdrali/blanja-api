import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/user.js";
import { requestOtp, updateOtpUsed, verifyOtp } from "../models/otp.js";
import { checkUserActive, UpdateUserActive } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { generateOTP } from "../utils/otp.js";
import { sendMail } from "../utils/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

export const requestOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const code = uuidv4();
    const date = new Date();
    await requestOtp({
      otp_code: otp,
      unique_code: code,
      email,
      created_at: date,
    });

    res.json({
      valid: true,
      status: 200,
      message: "Check your email to verify your account",
    });
    const subject = "Email Verification";
    const message = `Your OTP code is: ${otp}`;
    sendMail(email, subject, message);
  } catch (error) {
    res.json({
      valid: false,
      status: 500,
      message: error,
      data: [],
    });
  }
};

export const verifyOtpController = async (req, res) => {
  const { otp_code, email } = req.body;

  try {
    const otpResult = await verifyOtp({ otp_code: otp_code, email: email });
    if (otpResult.length === 0) {
      return res.json({
        valid: false,
        status: 400,
        message: "Invalid OTP",
      });
    }

    const { user_id, created_at } = otpResult[0];

    const expirationTime = new Date(created_at);
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    if (new Date() > expirationTime) {
      return res.json({
        valid: false,
        status: 400,
        message: "OTP has expired",
      });
    }

    const isActive = await checkUserActive(user_id); // Mengecek status aktif akun

    // Jika akun sudah aktif
    if (isActive) {
      return res.json({
        valid: false,
        status: 400,
        message: "Account is already active",
      });
    }

    await UpdateUserActive(user_id);

    await updateOtpUsed(otp_code);

    return res.json({
      valid: true,
      status: 200,
      message: "Account has been successfully activated",
    });
  } catch (error) {
    return res.json({
      valid: false,
      status: 500,
      message: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await getUserByEmail(email);
    if (checkEmail.length === 0) {
      return res.json({
        valid: false,
        status: 404,
        message: "Email not registered",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      checkEmail[0].password
    );

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: checkEmail[0]?.id,
          username: checkEmail[0]?.username,
          email: checkEmail[0]?.email,
          iat: Math.floor(Date.now() / 1000) - 30,
        },
        "shhhhh", // Gantilah dengan secret yang lebih kuat di lingkungan produksi
        { expiresIn: "1h" }
      );

      return res.json({
        valid: true,
        status: 200,
        message: "Login successfully",
        data: { token: token },
      });
    } else {
      return res.json({
        valid: false,
        status: 400,
        message: "Incorrect Email or Password",
      });
    }
  } catch (error) {
    return res.json({
      valid: false,
      status: 500,
      message: error.message ?? error,
    });
  }
};
