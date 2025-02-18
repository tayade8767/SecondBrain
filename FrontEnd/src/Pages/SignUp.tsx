/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { useRef } from "react"
import { Button } from "../Componants/Button"
import { Input } from "../Componants/Input"
import axios from "axios"
import { BACKEND_URL } from "../Config"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

export function SignUp() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const navigate = useNavigate();


    async function signup() {
        const username = usernameRef.current?.value;   
        const password = passwordRef.current?.value;    
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        });
        
        if(response.status === 200) {
            toast.success("User Registered Successfully Please Login");
            setTimeout(() => {
                navigate("/signin"); // navigate to signin page after successful signup
            }, 1500);
        }
        else {
            toast.error("Failed to Register User");
        }
    }


    return (
        <div className="h-screen w-screen bg-gray-500 flex justify-center items-center">
            <div className="bg-black rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button onclick={signup} loding={false} variant="primary" text={'SignUp'} fullwidth={true} />
                </div>
                <p className="font-normal pt-2 text-sm pl-3 text-white">
                Already have an Account? <Link className="text-blue-600" to="/signin">SignIn</Link>
                </p>
            </div>
            {/* Add ToastContainer here */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

