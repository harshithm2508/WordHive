import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Appbar />
            <div className="w-full max-w-2xl">
                <BlogCard authorName="Harshith Muthangi" title="Hello World" content="loremloremloremloremloremloremloremloremloremlorem" publishedDate="2nd Feb 2024" />
                <BlogCard authorName="Harshith Muthangi" title="Hello World" content="loremloremloremloremloremloremloremloremloremlorem" publishedDate="2nd Feb 2024" />
                <BlogCard authorName="Harshith Muthangi" title="Hello World" content="loremloremloremloremloremloremloremloremloremlorem" publishedDate="2nd Feb 2024" />
                <BlogCard authorName="Harshith Muthangi" title="Hello World" content="loremloremloremloremloremloremloremloremloremlorem" publishedDate="2nd Feb 2024" />
            </div>
        </div>
    );
}
