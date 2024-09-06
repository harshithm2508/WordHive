import Appbar from "./Appbar";
import { BlogProps } from "../hooks";
import { Avatar } from "./BlogCard";


export const FullBlog = ({ blog } : {blog : BlogProps})=>{
    return(
        <div>
            <Appbar/>
            <div className=" grid grid-cols-12 mt-16">
                <div className=" col-span-8 px-12">
                    <div className=" text-5xl font-bold">
                        {blog.title}
                    </div>
                    <div className=" mt-4 text-lg text-slate-600">
                        {blog.content}
                    </div>
                </div>

                <div className=" col-span-4 ">
                    <div className=" flex gap-4">
                        <Avatar name={blog.author.name} size={10}/>
                        <div className=" flex justify-center items-center text-xl font-semibold ">{blog.author.name}</div>
                    </div>
                    <div className=" text-gray-500 pr-5">
                        Naruto Uzumaki is resilient, determined, and loyal. Despite adversity, he stays optimistic, working hard to protect his friends. His empathy and perseverance inspire others, and his journey from outcast to leader shows his dedication to peace and self-improvement.
                    </div>
                </div>
            </div>
        </div>
    )
}