import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
	@Field(() => Int)
	@PrimaryKey()
	id!: number

	@Field(() => String)
	@Property({ type: 'text', unique: true })
	email!: string

	@Property({ type: 'text' })
	password: string

	@Field()
	@Property({ type: 'text', nullable: true })
	phoneNumber?: string

	@Field(() => String)
	@Property({ type: 'date' })
	createdAt: Date = new Date()

	@Field(() => String)
	@Property({ type: 'date', onUpdate: () => new Date() })
	updatedAt: Date = new Date()
}