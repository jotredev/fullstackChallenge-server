import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Permission from "./permission.model";
import Post from "./post.model";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Permission, {
  foreignKey: "id_user",
  sourceKey: "id",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "created_by",
  sourceKey: "id",
  onDelete: "CASCADE",
});

Permission.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
});

Post.belongsTo(User, {
  foreignKey: "created_by",
  targetKey: "id",
});

// Insert admin default
(async () => {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);

  // Verify exists admin
  const existingAdmin = await User.findOne({ where: { id: 1 } });
  if (!existingAdmin) {
    const newUser = {
      id: 1,
      name: "Admin",
      lastname: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    };
    const permAdmin = {
      id: 1,
      name: "admin",
      id_user: 1,
    };
    const permCRD = {
      id: 2,
      name: "crd_posts",
      id_user: 1,
    };
    const permUpdatePosts = {
      id: 3,
      name: "update_posts",
      id_user: 1,
    };
    await User.create(newUser);
    await Permission.create(permAdmin);
    await Permission.create(permCRD);
    await Permission.create(permUpdatePosts);
  }
})();

export default User;
