import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";
import User from "./user.model";

const Log = sequelize.define(
  "logs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Log;
