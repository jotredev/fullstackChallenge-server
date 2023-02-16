import { sequelize } from "../database/config";
import { DataTypes } from "sequelize";
import Permission from "./permission.model";
import bcrypt from "bcrypt";

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
});

Permission.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
  onDelete: "CASCADE",
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
    await User.create(newUser);
    await Permission.create(permAdmin);
  }
})();

export default User;
