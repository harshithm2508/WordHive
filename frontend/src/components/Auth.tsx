import { ChangeEvent, useState} from "react"
import { Link } from "react-router-dom"
import { SignupType, signupInput } from "@harshithm2508/wordhivecommon"

export const Auth = ()=>{
    const [postInputs, setPostInputs] = useState<SignupType>({
        email : "",
        password : "",
        name : ""
    })
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="text-3xl font-extrabold pb-2">
                Create an Account
            </div>
            <div>
                Already have an account? <Link className="pl-2 underline" to={'/signin'}>Login</Link>
            </div>
            <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name : e.target.value
                })
            }}/>

            <LabelledInput label="Password" placeholder="Enter your username" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name : e.target.value
                })
            }}/>

            <LabelledInput label="Password" placeholder="Enter your username" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name : e.target.value
                })
            }}/>
        </div>
    )
}

interface LabelledInputType{
    label : string;
    placeholder : string,
    onChange : (e: ChangeEvent<HTMLInputElement>)=>void
}

function LabelledInput({label, placeholder, onChange} : LabelledInputType){
    return(
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}