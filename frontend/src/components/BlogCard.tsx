interface BlogCardProps{
    authorName : string;
    title : string;
    content : string;
    publishedDate : string
}


export default function BlogCard({authorName, title, content, publishedDate} : BlogCardProps){
    return(
        <div className=" border-b-2 border-slate-400 px-2 pb-2 mt-4">
            <div className=" flex items-center gap-3">
                <Avatar name={authorName} size={8}/>
                <Circle/>
                <div className=" ">{authorName}</div>
                <Circle/>
                <div className=" text-slate-500">{publishedDate}</div>
            </div>
            <div className=" pt-2">
                <div className=" font-bold text-xl">{title}</div>
                <div className=" text-lg text-slate-500">{content}</div>
            </div>
            <div className=" mt-4 font-light text-slate-500">
                    {`${Math.ceil(content.length/100)} minutes read`}
            </div>
        </div>
    )
}


function Circle(){
    return(
        <div className=" h-1 w-1 rounded-full bg-slate-400">

        </div>
    )
}


export function Avatar({name, size} : {name : string, size : number}){
    return(
    <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-light text-gray-600 dark:text-gray-300">{name.split(" ").length == 2 ? name.split(" ")[0][0]+name.split(" ")[1][0] : name[0]}</span>
    </div>
    )
}