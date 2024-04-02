import { BlogCard } from "../components/BlogCard"

export const Blogs = ()=>{
    return(
        <div className="flex justify-center">
            <div className="max-w-xl">
            <BlogCard 
                    authorName="Harshith" 
                    title="How an ugly single page website makes $5000 a month without affiliate marketing" 
                    content="How an ugly single page website makes $5000 a month without affiliate marketingHow an ugly single page website makes $5000 a month without affiliate marketingHow an ugly single page website makes $5000 a month without affiliate marketing"
                    publishedDate="April 01, 2024"/>
            
            <BlogCard 
                    authorName="Harshith" 
                    title="How an ugly single page website makes $5000 a month without affiliate marketing" 
                    content="How an ugly single page website makes $5000 a month without affiliate marketingHow an ugly single page website makes $5000 a month without affiliate marketingHow an ugly single page website makes $5000 a month without affiliate marketing"
                    publishedDate="April 01, 2024"/>

            <BlogCard 
                    authorName="Harshith" 
                    title="How an ugly single page website makes $5000 a month without affiliate marketing" 
                    content="How an ugly single page website makes $5000 a month without affiliate marketingHow an ugly single page website makes $5000 a month without affiliate marketingHow an ugly single page website makes $5000 a month without affiliate marketing"
                    publishedDate="April 01, 2024"/>
            </div>
        </div>
    )
}
