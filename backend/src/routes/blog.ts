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

export default blogRouter;