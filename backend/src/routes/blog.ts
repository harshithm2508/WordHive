import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign, verify } from 'hono/jwt'


const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET : string
    },
    Variables : {
      userId : string;
    }
  }>();


  blogRouter.use('/*', async (c,next)=>{
    const token = c.req.header("authorization") || "";
    try{
        const user = await verify(token, c.env.JWT_SECRET);
      if(user){
        c.set("userId",String(user.id))
        await next();
      }else{
        c.status(403);
        return c.json({
          message : "You are not logged in "
        })
      }
    }catch(e){
      c.status(403);
        return c.json({
          message : "You are not logged in "
        })
    }
  })


  //  Publishing a blog
  blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const authroId = c.get('userId')
    
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : Number(authroId)
      }
    })
  
    return c.json({
      id : blog.id
    })
  })


  //  Updating a blog
  blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const authroId = c.get('userId')
    
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
      where : {
        id : body.id
      },
      data : {
        title : body.title,
        content : body.content,
        authorId : Number(authroId)
      }
    })
  
    return c.json({
      id : blog.id
    })
  })


    //  Getting blogs in bulk
    blogRouter.get('/bulk', async (c)=>{
      const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const blogs = await prisma.blog.findMany();
  
  
      return c.json({
        blogs
      })
    })


  //  Getting blogs by id
  blogRouter.get('/:id', async (c)=>{
    const id = await c.req.param("id");
    
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
      const blog = await prisma.blog.findFirst({
        where : {
          id : Number(id)
        },
      })

      return c.json({
        blog
      })
    } catch(e){
      c.status(411);
      return c.json({
        message : "Error while fetching blog post"
      })
    }
  })





export default blogRouter;