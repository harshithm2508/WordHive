import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify, sign, decode } from "hono/jwt";
const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();


blogRouter.post('/',async (c)=>{

    try{
        const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : body.authorId
            }
      })

      return c.json({
        id : body.id
      })
    }catch(e){
        return c.json({
            error : e
        })
    }
  })
  
blogRouter.put('/',async (c)=>{
    try{
        const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blog = await prisma.post.update({
            where : {
                id : body.id
            },

            data : {
                title : body.title,
                content : body.content
            }
      })

      return c.json({
        id : body.id
      })
    }catch(e){
        return c.json({
            error : e
        })
    }
  })
  

  //    getting the first blog
  blogRouter.get('/',async (c)=>{
    try{
        const body = await c.req.json();

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blog = await prisma.post.findFirst({
            where : {
                id : body.id
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
  

  // getting all the blogs
  blogRouter.get('/bulk',async (c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blogs = await prisma.post.findMany();
    }catch(e){
        return c.json({
            error : e
        })
    }
  })
  

export default blogRouter;