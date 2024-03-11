import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { verify, sign, decode } from "hono/jwt";
const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },Variables : {
        userId : string
    }
}>();


blogRouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id);
        await next();
    }else{
        c.status(403);
        return c.json({
            error : "You are not authorized to do this operation"
        })
    }
})


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
                authorId : c.get("userId")
            }
      })

      return c.json({
        id : c.get("userId")
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
        id : c.get('userId')
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