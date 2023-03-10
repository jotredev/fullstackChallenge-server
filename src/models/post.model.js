import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";
import Review from "./reviews.model";

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

Post.hasMany(Review, {
  foreignKey: "id_post",
  sourceKey: "id",
});

Review.belongsTo(Post, {
  foreignKey: "id_post",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default Post;
