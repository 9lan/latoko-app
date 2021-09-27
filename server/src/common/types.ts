import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Field, InputType } from "type-graphql";

export type MyContext = {
	em: EntityManager<IDatabaseDriver<Connection>>
}

@InputType()
export class UserInput {
	@Field()
	email: string

	@Field()
	password: string
}