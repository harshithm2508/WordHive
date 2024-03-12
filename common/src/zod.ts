import z, { string } from "zod";

export const signUpInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
  })


export type signUpInput = z.infer<typeof signUpInput>



export const signInInput = z.object({
  email : z.string().email(),
  password : z.string().min(6)
})


export type signInInput = z.infer<typeof signUpInput>


export const createBlogInput = z.object({
  title : z.string(),
  content : z.string()
})

export type createBlogInput = z.infer<typeof createBlogInput>


export const updateBlogInput = z.object({
  title : z.string(),
  content : z.string(),
  id : z.string()
})

export type updateBlogInput = z.infer<typeof updateBlogInput>