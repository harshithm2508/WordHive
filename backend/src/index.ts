import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup',(c)=>{
  return c.text("User is signing up")
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
