import { check, validationResult } from "express-validator";

export const validatorCreatePost = [
  check("title").exists().withMessage("The title is required"),
  check("desc").exists().withMessage("The description is required"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];
