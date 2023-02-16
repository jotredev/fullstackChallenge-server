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

Log.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default Log;
