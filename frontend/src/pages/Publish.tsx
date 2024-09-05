import axios from "axios"
import Appbar from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"

export const Publish = () =>{

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    function publishBlog(){
        axios.post(`${BACKEND_URL}api/v1/blog`)
    }

    return(
        <div className=" min-h-screen w-full">
            <Appbar/>
            <div className=" w-full flex justify-center">
                <div className=" w-3/4 h-3/4">
                    <div className=" mt-4">
                        <label className="block mb-2 text-2xl font-medium">Title</label>
                        <input onChange={(e)=>setTitle(e.target.value)} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="block p-2.5 w-full text-md text-gray-900 rounded-lg border-2 border-gray-300" placeholder="Enter you title here."/>
                    </div>

                    <Textarea onChangeHandler={(e)=>setContent(e.target.value)}/>


                    <div className=" mt-4">
                        <button onClick={publishBlog} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Publish your Blog</button>       
                    </div>

                    {title}
                    {content}

                </div>
            </div>
        </div>
    )
}


function Textarea({onChangeHandler} : {onChangeHandler : (e : ChangeEvent<HTMLTextAreaElement>) => void} ){
    return(
        <div className=" mt-4">
                        <label className="block mb-2 text-2xl font-medium text-gray-900">Your Content</label>
                        <textarea onChange={onChangeHandler} id="message" rows={15} className=" block p-2.5 w-full text-md text-gray-900 rounded-lg border-2 border-gray-300" placeholder="Write your thoughts here..."></textarea>
                    </div>
    )
}