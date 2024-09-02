import { Hono } from 'hono'
import { userRouter } from './routes/users'
import { blogRouter } from './routes/blogs'
import { cors } from 'hono/cors'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('/*',cors())
app.route('/api/v1/user',userRouter);
app.route('api/v1/blog', blogRouter)

export default app
