import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { verify, sign, decode } from "hono/jwt";
import { signinInput, signupInput, createPostInput, updatePostInput} from '@harshithm2508/wordhivecommon'

const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },Variables : {
        userId : string
    }
}>();


blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const payload = await verify(jwt, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})


blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})


  
blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	console.log(body.id)
	const updating = await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	console.log("")
	return c.text('updated post');
});





  // getting all the blogs
  blogRouter.get('/bulk',async (c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blogs = await prisma.post.findMany();
        return c.json({
            blogs
        })
    }catch(e){
        return c.json({
            error : e
        })
    }
  })
  

  //    getting the first blog
  blogRouter.get('/:id',async (c)=>{
    try{
        
        const id = c.req.param("id")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blog = await prisma.post.findFirst({
            where : {
                id 
            }
        })

        return c.json({
        blog
        })
        }catch(e){
            return c.json({
            error : e
        })
    }
  })
  
  

export default blogRouter;