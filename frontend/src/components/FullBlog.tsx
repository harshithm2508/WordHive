import Appbar from "./Appbar";
import { BlogProps } from "../hooks";


export const FullBlog = ({ blog } : {blog : BlogProps})=>{
    return(
        <div>
            <Appbar/>
            <div className=" grid grid-cols-12">
                <div className=" col-span-8 p-12">
                    <div className=" text-5xl font-bold">
                        {blog.title}
                    </div>
                    <div className=" mt-4 text-lg text-slate-600">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4">{blog.author.name}</div>
            </div>
        </div>
    )
}