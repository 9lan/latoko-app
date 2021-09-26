import { MyContext } from "../common/types";
import { Post } from "../entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	getAllPost(
		@Ctx() { em }: MyContext
	): Promise<Post[]> {
		return em.find(Post, {})
	}
}