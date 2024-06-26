import { ChangeEvent, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupType, signupInput } from "@harshithm2508/wordhivecommon"
import { DATABASE_URL } from "../config"
import axios from "axios"

export const Auth = ({type} : {type : "signup" | "signin"})=>{
    const [postInputs, setPostInputs] = useState<SignupType>({
        email : "",
        password : "",
        name : ""
    })

    const navigate = useNavigate()

    const sendRequest = async ()=>{
        try{
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/${type==='signup'?'signup':'signin'}`,postInputs)
            const jwt = response.data;
            localStorage.setItem('token',jwt);
            navigate('/blogs')
        }catch(e){
            alert("Error while signing up")
        }
    }


    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-2/4">
                <div className="text-3xl text-center font-extrabold pb-2">
                    {type === 'signin' ? "Login to your account" : "Create an account"}
                </div>
                <div className="text-center">
                    {type==="signin" ? "Don't have an account?" : "Already have an account?"} <Link className="pl-2 underline" to={type === 'signin' ? '/signup' : '/signin'}>{type==="signin" ? "Sign Up" : "Login"}</Link>
                </div>


                {type === 'signup' ? <LabelledInput label="Name" placeholder="Enter your Name" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        name : e.target.value
                    })
                }}/> : null}

                <LabelledInput label="E-mail" placeholder="Enter your E-mail" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email : e.target.value
                    })
                }}/>

                <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password : e.target.value
                    })
                }}/>

                {/* //Sign In (or) SignUp button */}
                <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
                dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signin" ? "Sign In" : "Sign Up"}</button>
            </div>
        </div>
    )
}

interface LabelledInputType{
    label : string;
    placeholder : string,
    onChange : (e: ChangeEvent<HTMLInputElement>)=>void,
    type? : string
}

function LabelledInput({label, placeholder,type, onChange} : LabelledInputType){
    return(
        <div className="my-5">
            <label  className="block mb-2 text-sm font-bold text-gray-900 pt-2 dark:text-black">{label}</label>
            <input type={type || 'text'} id="first_name" className="bg-gray-50 shadow-md	border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={onChange} placeholder={placeholder} required />
        </div>
    )
}