import { body, validationResult } from "express-validator";

export const validateCreate = [
  body("username").notEmpty().withMessage("username is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("format must be email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isNumeric()
    .withMessage("phone must be a number"),
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("format must be email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      [error.path]: error.msg,
    }));

    return res.status(400).json({
      valid: false,
      status: 400,
      message: errorMessages,
    });
  }

  next();
};
