import { ChangeEvent, useState } from "react";
import { SignUpInput } from "@harshithm2508/wordhivecommon";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "./Spinner";


function Auth({type} : {type : 'signin' | 'signup'}){


    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);

    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name : "",
        username : "",
        password : ""
    })

    async function sendRequest(){
        setLoading(true);
        try{
                const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === 'signin' ? 'signin' :'signup'}`,postInputs);
                const jwt = response.data;
                localStorage.setItem('token',jwt);
                navigate('/blogs');
            }
        catch(e){
            alert("Wrong Credentials")
            setLoading(false);
        }
    }

    if(loading){
        return <Spinner/>
    }

    return(
        <div className=" min-h-screen lg:h-screen flex justify-center items-center">
            <div className=" w-3/4 flex flex-col items-center">
                <div className=" flex-col text-center ">
                    <div className=" text-4xl font-bold">{type === 'signin' ? "Login to your account" : "Create an account"}</div>
                    <div className=" font-semibold text-slate-400">{type==='signin' ? "Don't have an account ? " : 'Already have an account ?'} <Link className=" underline" to={type === 'signin' ? '/signup' : '/signin'}>{type === 'signin' ? 'Create an account' : 'Login'}</Link></div>
                </div>

                <div className=" w-3/4">
                    {type === 'signup' ? <LabelledInput label="Name" placeholder="John Does" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name : e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="johndoe@mail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            username : e.target.value
                        })
                    }}/>
                    <LabelledInput label="Password" placeholder="Enter password" type="password" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                    }} />
                </div>

                <div className=" w-3/4 mt-7">
                    <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === 'signin' ? 'Sign In' : 'Sign Up'}</button>
                </div>

            </div>
        </div>
    )
}

interface LabelledInputProps{
    label : string;
    placeholder? : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string
}


function LabelledInput({label, placeholder, onChange, type} : LabelledInputProps){
    return(
        <div className=" mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}

export default Auth;