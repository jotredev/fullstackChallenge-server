import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";

const Review = sequelize.define(
  "reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Review;
