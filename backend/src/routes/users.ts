import { Hono } from "hono";

export const userRouter = new Hono();

userRouter.post('/signup',(c)=>{
    return c.text("User signs up in this page.")
})

userRouter.post('/signin',(c)=>{
    return c.text("User signs in this page.")
})