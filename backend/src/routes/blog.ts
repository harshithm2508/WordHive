import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign, verify } from 'hono/jwt'


const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET : string
    }
  }>();


  //  Publishing a blog
  blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : 1
      }
    })
  
    return c.json({
      id : blog.id
    })
  })


  //  Updating a blog
  blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    
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
        authorId : 1
      }
    })
  
    return c.json({
      id : blog.id
    })
  })



  //  Getting blogs by id
  blogRouter.get('/', async (c)=>{
    const body = await c.req.json();
    
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
      const blog = await prisma.blog.findFirst({
        where : {
          id : body.id
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

export default blogRouter;