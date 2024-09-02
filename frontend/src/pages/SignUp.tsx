import Quote from "../components/Quote";
import Auth from "../components/Auth";

function SignUp(){
    return(
        <div className=" grid grid-cols-2">
            <Auth/>
            <Quote/>
        </div>
    )
}

export default SignUp;