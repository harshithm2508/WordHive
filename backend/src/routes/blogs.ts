import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@harshithm2508/wordhivecommon";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        SECRET_KEY : string
    },
    Variables : {
        userId : string,
    }
}>();

blogRouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader, c.env.SECRET_KEY);
        if(user){
            c.set("userId",String(user.id))
            await next();
        }else{
            c.status(403);
            return c.json({
                "message" : "You are not logged in"
            })
        }
    }catch(e){
        c.status(403);
        return c.json({
            "message" : "There was an error"
        })
    }
})


//  posting a blog route
blogRouter.post('/',async (c)=>{

    const body = await c.req.json();

    const { success } = await createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Invalid Inputs"
        })
    }


    const id = await c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : Number(id)
            }
        })

        return c.json({
            id : blog.id
        })
    }catch(e){
        console.log("There was an error in uploading the blog")
        return c.text("Error")
    }
})

//  Editing a blog route
blogRouter.put("/",async (c)=>{
    const body = await c.req.json();

    const { success } = await updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Invalid Inputs"
        })
    }

    const userId = await c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content,
                authorId : Number(userId)
            }
        })
        console.log("error")

        return c.json({
            id : blog.id
        })
    }catch(e){
        console.log(e)
        return c.text("There was an error in updating the blog : ");
    }
})

blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blogs = await prisma.blog.findMany({
            select : {
                content : true,
                title : true,
                id: true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });

        return c.json({
            blogs
        })
    }catch(e){
        return c.text("There was an error in getting blogs")
    }
})

blogRouter.get('/:id',async (c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.findFirst({
            where : {
                id : Number(id)
            },
            select : {
                title : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    }catch(e){
        console.log("There was an error in getting the blog");
        return c.status(411);
    }
})