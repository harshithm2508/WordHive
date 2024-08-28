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


//  DATABASE_URL : postgresql://wordhive-db_owner:dl5kPYm3sMCQ@ep-crimson-rice-a5e26ahn.us-east-2.aws.neon.tech/wordhive-db?sslmode=require
//  Pool lin  :     DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiN2NiMzYxOWYtMGNmNS00NWY5LTg3Y2EtODM5ODg5YWY3MTcwIiwidGVuYW50X2lkIjoiYWYzN2EwN2M2NjQyYzZlMjQ4ZjU1NzE2ZjNkMzJkZTRmMWU4M2Y4NTBlMjQzNjUzYzZkMWE5YjQ3YWMxZTY0YyIsImludGVybmFsX3NlY3JldCI6ImE0OTc3OTM0LWMwYjktNGEyOS1iOWYzLWM3ZGI1MjZjNDQ5MSJ9.nR5zx3xc8zBrS9H-TlEtj4sx_ayhvs4N-HPYWxV2xTU"