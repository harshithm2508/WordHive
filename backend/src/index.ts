import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx';

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string
  }
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup',async (c)=>{
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

app.post('/api/v1/user/signin',(c)=>{
  return c.text("User is signing in")
})

app.post('/api/v1/blog',(c)=>{
  return c.text("User is uploading blog")
})

app.put('/api/v1/blog',(c)=>{
  return c.text('User is editing a blog')
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.text("User is getting a  blog by id")
})

app.get('/api/v1/blog/bulk',(c)=>{
  return c.text("User will be displayed all the blogs")
})

export default app