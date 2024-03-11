import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx';
import userRouter from '../routes/user';
import blogRouter from '../routes/blog';

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string
  }
}>();


app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})




export default app