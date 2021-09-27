import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.ts$/
	},
	entities: [Post, User],
	dbName: 'latoko-db',
	user: 'postgres',
	password: 'postgres',
	debug: !__prod__,
	type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]