import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Post;
