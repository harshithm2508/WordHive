import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface BlogProps{
    content : string,
    title : string,
    id : number,
    author : {
        name : string
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [ blogs, setBlogs ] = useState<BlogProps[]>([])

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