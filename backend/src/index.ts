import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup',(c) => {

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  return c.text("Sign Up route")
})

app.post('api/v1/user/signin', (c) => { 
  return c.text("Sign In route")
})

app.post('api/v1/blog', (c) => {
  return c.text('blogs')
})

app.put('api/v1/blog',(c)=>{
  return c.text('Updating blogs')
})

app.get('api/v1/blog/:id',(c)=>{
  return c.text("Get blogs by id")
})

app.get('api/v1/blog/bulk', (c)=>{
  return c.text("Get blogs in bulk")
})

export default app;