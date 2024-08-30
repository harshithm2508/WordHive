import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, sign, decode } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        SECRET_KEY : string
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

        const jwt = await sign({
            id : user.id
        },c.env.SECRET_KEY)
        
        console.log(`User successfully create with username : ${user.username}`)
        return c.text(jwt)
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
            }
        })

        if(!user){
            c.status(403);
            return c.text("User is not found")
        }

        if(user?.password !== body.password){
            c.status(403);
            return c.text("Wrong Password")
        }
        
        

        const jwt = await sign({
            id : user?.id
        },c.env.SECRET_KEY)
        console.log("User logged in")
        return c.text(jwt)
    }catch(e){
        c.status(401)
        return c.text("User credentials are incorrect or user does not exist.")
    }
})