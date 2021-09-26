import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from './constants'
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
	const orm = await MikroORM.init(mikroConfig)
	await orm.getMigrator().up()

	// const post = orm.em.create(Post, { title: 'test post' })
	// await orm.em.persistAndFlush(post)
}

main().catch(err => console.error(err));