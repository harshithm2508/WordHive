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


blogRouter.post('/api/v1/blog',(c)=>{
    return c.text("User is uploading blog")
  })
  
blogRouter.put('/api/v1/blog',(c)=>{
    return c.text('User is editing a blog')
  })
  
  blogRouter.get('/api/v1/blog/:id',(c)=>{
    return c.text("User is getting a  blog by id")
  })
  
  blogRouter.get('/api/v1/blog/bulk',(c)=>{
    return c.text("User will be displayed all the blogs")
  })
  

export default blogRouter;