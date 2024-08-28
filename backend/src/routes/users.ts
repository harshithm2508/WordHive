import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { use } from "hono/jsx";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
    }
}>();

userRouter.post('/signup',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try{
        const user = await prisma.user.create({
            data : {
                name : body.name,
                username : body.username,
                password : body.password
            }
        })
        console.log(`User successfully create with username : ${user.username}`)
        return c.text(`User successfully create with username : ${user.username}`)
    }catch(e){
        c.status(411);
        return c.text("There was an error while signing up")
    }
})

userRouter.post('/signin',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    try{
        const user = await prisma.user.findUnique({
            where : {
                username : body.username,
                password : body.password
            }
        })

        console.log("User logged in")
        return c.text("Correct credentials")
    }catch(e){
        c.status(401)
        return c.text("User credentials are incorrect or user does not exist.")
    }
})