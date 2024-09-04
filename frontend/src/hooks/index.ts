import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface BulkBlogProps{
    content : string,
    title : string,
    id : number,
    author : {
        name : string
    }
}

export interface BlogProps{
    title : string,
    content : string,
    author : {
        name : string
    }
}

export const useBlog = ({id} : { id : string}) => {
    const [loading, setLoading] = useState(true);
    const [ blog, setBlog ] = useState<BlogProps>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlog(response.data.blog)
            setLoading(false);
        })
        .catch((e)=>{
            console.log("There was an error in fetching the blogs : ",e);
        })
    })

    return({
        loading, blog
    })
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [ blogs, setBlogs ] = useState<BulkBlogProps[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs)
            setLoading(false);
        })
        .catch((e)=>{
            console.log("There was an error in fetching the blogs : ",e);
        })
    })

    return({
        loading, blogs
    })
}