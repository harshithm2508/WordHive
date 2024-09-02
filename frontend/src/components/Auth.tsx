function Auth(){
    return(
        <div className=" h-screen flex justify-center items-center">
            <div className=" w-3/4 flex flex-col items-center">
                <div className=" flex-col text-center ">
                    <div className=" text-4xl font-bold">Create an account</div>
                    <div className=" font-semibold text-slate-400">Already have an account ? Login</div>
                </div>

                <div className=" w-3/4">
                    <LabelledInput label="Name"/>
                    <LabelledInput label="Email"/>
                    <LabelledInput label="Password"/>
                </div>

                <div className=" w-3/4 mt-7">
                    <button type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                </div>

            </div>
        </div>
    )
}


function LabelledInput({label} : {label : string}){
    return(
        <div className=" mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
    )
}

export default Auth;