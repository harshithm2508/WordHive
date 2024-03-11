import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify, sign, decode } from "hono/jwt";
const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();


userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
    try{
      const user = await prisma.user.create({
        data : {
          email : body.email,
          password : body.password,
          name : body.name
        }
      })
      
      const token = await sign({
        id : user.id
      },c.env.JWT_SECRET)
  
      console.log(token)
  
      return c.text("Signed Up")
    }catch(e){
      return c.json({
        error : e
      })
    }
  })



  userRouter.post('/signin',async (c)=>{

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
    try{
      const user = await prisma.user.findFirst({
        where : {
          email : body.email,
          password : body.password
        }
      })
  
      if(!user){
        c.status(403);
        return c.text("Invalid Credentials")
      }
  
      const token = await sign({
        id : user.id
      },c.env.JWT_SECRET)
  
      return c.text(token)
    }catch(e){
      console.log("There was an error : ",e)
    }
  })

export default userRouter;