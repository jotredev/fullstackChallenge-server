import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

export { sequelize };
