import "dotenv/config";

import { DataSource } from "typeorm";
import { User } from "../models";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [User],
	synchronize: true,
});
