import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";
import User from "./user.model";

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

Permission.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default Permission;
