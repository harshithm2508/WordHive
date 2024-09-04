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
            <Avatar name="Harshtih Muthangi" size={10}/>
        </div>
    )
}