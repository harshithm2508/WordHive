import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export default function Appbar(){
    return(
        <div className=" flex justify-between py-4 px-20 w-full border-b-2 ">
            <Link to={'/blogs'}>
                <div className=" text-3xl font-semibold text-blue-900">
                    WordHive
                </div>
            </Link>
            <div className=" flex gap-7">
                <Link to={'/publish'}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
                </Link>
                <Avatar name="Harshtih Muthangi" size={10}/>
            </div>
        </div>
    )
}