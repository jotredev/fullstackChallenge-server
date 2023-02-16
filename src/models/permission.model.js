import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";

const Permission = sequelize.define(
  "permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Permission;
