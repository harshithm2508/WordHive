import { Hono } from "hono";

export const blogRouter = new Hono();

blogRouter.post('/',(c)=>{
    return c.text("User posts blogs at this endpoint")
})

blogRouter.put("/",(c)=>{
    return c.text("User updates his blogs at this endpoint")
})

blogRouter.get('/bulk', (c)=>{
    return c.text("Users gets all the blogs at this endpoint.")
})

blogRouter.get('/:id',(c) => {
    return c.text("User gets his blog at this endpoint.")
})
