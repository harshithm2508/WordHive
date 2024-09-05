import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import Appbar from "../components/Appbar";

function Blog(){

    const { id } = useParams();
    const { loading, blog } = useBlog({
        id : id || ""
    });

    if(loading){
        return(
            <div>
                <Appbar/>
                <Spinner/>
            </div>
        )
    }
    
    return(
        <div>
            <FullBlog blog={blog}/>
        </div>
    )
}

export default Blog;