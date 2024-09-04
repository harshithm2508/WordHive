import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

export default function Blogs() {

    const { loading, blogs } = useBlogs();

    if(loading){
        return(
            <div>
                Loading....
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