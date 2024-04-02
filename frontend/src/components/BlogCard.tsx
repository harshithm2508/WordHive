interface BlogCardProps{
    authorName : string;
    title : string;
    content : string;
    publishedDate : string
}

export const BlogCard = ({authorName, title, content, publishedDate} : BlogCardProps)=>{
    return (
        <div className="border-b-2 border-slate-300 pb-4">
            
            <div className="flex pb-2">
                <div className="avatar pl-2">
                    <Avatar name={authorName} />
                </div>

                <div className="AuthorName flex flex-col justify-center font-extralight pl-2 text-red-700">
                    {authorName}
                </div> 

                <div className="publishingdate flex flex-col justify-center font-extralight pl-2">
                    {publishedDate}
                </div>
            </div>

            <div className="text-xl font-semibold">
                {title}
            </div>

            <div className="text-md font-thin  text-gray-600">
                {content.length>100 ? content.slice(0,100)+" ....." : content}
            </div>

            <div className="text-slate-400 font-thin">
                {`${Math.ceil(content.length / 100)} minutes read`}
            </div>
        </div>
    )
}

function Avatar({name} : { name : string }){

    const naam = name.split(" ");
    return(
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{naam.length > 1 ? naam[0][0]+naam[naam.length-1][0] : naam[0][0]}</span>
    </div>
    )
}