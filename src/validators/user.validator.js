import { check, validationResult } from "express-validator";

export const validatorCreateUser = [
  check("name").exists().withMessage("The name is required"),
  check("lastname").exists().withMessage("The first lastname is required"),
  check("email")
    .exists()
    .isEmail()
    .withMessage("The email is not valid")
    .notEmpty()
    .withMessage("The email is required"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

export const validatorPermission = [
  check("permission").exists().withMessage("The name permission is required"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];
