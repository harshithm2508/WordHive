import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export default function Blogs() {

    const { loading, blogs } = useBlogs();

    if(loading){
        return(
            <div>
                <Appbar/>
                <div className=" flex flex-col items-center">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Appbar />
            {blogs.map((blog)=>{
                return <BlogCard id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate="2nd Feb 2024"/>
            })}
        </div>
    );
}