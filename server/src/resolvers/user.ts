import { MyContext, UserInput } from "../common/types";
import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { UserResponse } from "../common/errors";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async getAllUser(
		@Ctx() { em }: MyContext
	): Promise<User[]> {
		try {
			await em.find(User, {})
		} catch (err) {
			console.log(err)
		}

		return em.find(User, {})
	}

	@Mutation(() => UserResponse)
	async createUser(
		@Arg('options') options: UserInput,
		@Ctx() { em }: MyContext
	): Promise<UserResponse> {
		const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!validEmail.test(String(options.email).toLowerCase())) {
			return {
				errors: [{
					field: 'email',
					message: 'email is not valid'
				}]
			}
		}

		if (options.password.length < 6) {
			return {
				errors: [{
					field: 'password',
					message: 'password must be 6 character length'
				}]
			}
		}

		const hashPassword = await argon2.hash(options.password)
		const user = em.create(User, { email: options.email, password: hashPassword });

		try {
			await em.persistAndFlush(user)
		} catch (err) {
			if (err.code === '23505') {
				return {
					errors: [{
						field: 'email',
						message: 'email is already taken'
					}]
				}
			}
		}

		return { user }
	}

	@Mutation(() => UserResponse)
	async loginUser(
		@Arg('options') options: UserInput,
		@Ctx() { em }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(User, { email: options.email.toLowerCase() })
		if (!user) {
			return {
				errors: [{
					field: 'email',
					message: 'email is not registered'
				}]
			}
		}
		const validPassword = await argon2.verify(user.password, options.password)
		if (!validPassword) {
			return {
				errors: [{
					field: 'password',
					message: 'password is incorrect'
				}]
			}
		}
		return { user }
	}

}