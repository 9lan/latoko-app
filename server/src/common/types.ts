import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Field, InputType } from "type-graphql";
import { Request, Response } from "express"
import { Session, SessionData } from "./session";

export type MyContext = {
	em: EntityManager<IDatabaseDriver<Connection>>;
	req: Request & { session: Session & Partial<SessionData> };
	res: Response;
}

@InputType()
export class UserInput {
	@Field()
	email: string

	@Field()
	password: string
}