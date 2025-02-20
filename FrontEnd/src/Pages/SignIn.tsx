 
 
import { useRef } from "react"
import { Button } from "../Componants/Button"
import { Input } from "../Componants/Input"
import axios from "axios"
import { BACKEND_URL } from "../Config"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

export function SignIn() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const navigate = useNavigate();


    async function signin() {
        const username = usernameRef.current?.value;   
        const password = passwordRef.current?.value;    
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        });
        await localStorage.setItem('token',response.data.token);
        if(response.status === 200) {
            toast.success("User Login Successfully");
            setTimeout(() => {
                navigate("/dashbord"); // Navigate after 2 seconds
            }, 1500); // navigate to signin page after successful signup
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
                    <Button onclick={signin} loding={false} variant="primary" text={'SignIn'} fullwidth={true} />
                </div>
                <p className="font-normal pt-2 text-sm pl-3 text-white">
                   Don't have an Account? <Link className="text-blue-600" to="/">SignUp</Link>
                </p>
            </div>
            {/* Add ToastContainer here */}
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

