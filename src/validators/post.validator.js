import { check, param, validationResult } from "express-validator";

// Validator create posts
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

// Validator create review
export const validatorCreateReview = [
  param("id")
    .exists()
    .withMessage("The id of post is required")
    .isInt()
    .withMessage("The parameter must be integer"),
  check("name").exists().withMessage("The name of user is required"),
  check("rating")
    .exists()
    .withMessage("The rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("The rating must be an integer between 1 and 5"),
  check("comment").exists().withMessage("The name of user is required"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

// Validator get post
export const validatorGetPost = [
  param("id")
    .exists()
    .withMessage("The id of post is required")
    .isInt()
    .withMessage("The parameter must be integer"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];
