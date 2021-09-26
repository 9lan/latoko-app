import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.ts$/
	},
	entities: [Post],
	dbName: 'postgres',
	user: 'postgres',
	password: 'password',
	debug: !__prod__,
	type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]