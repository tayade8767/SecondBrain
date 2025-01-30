/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { SideBar } from "../Componants/SideBar";
import { BACKEND_URL } from "../Config";
import axios from "axios"; 
import { Card } from "../Componants/Card";
import { useParams } from "react-router-dom";

export function SharePage() {

    const { params } = useParams();
    const [Contents, setContents] = useState([]);
    const [username,setusername] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const gettingdata = await axios.get(`${BACKEND_URL}/api/v1/brain/${params}`)
            console.log(gettingdata.data);
            setContents(gettingdata.data.content);
            setusername(gettingdata.data.username);
        }
        const interval = setInterval(() => {
            fetchData();
        },10000);
        fetchData();
        return () => clearInterval(interval);
    },[params])


    return (
        <div className="flex">
        <SideBar />
      
        <div className="ml-0 md:ml-72 w-full bg-gray-100 min-h-screen border-2 p-4">
          {/* Display Username */}
            <div className="font-extrabold text-5xl text-red-400 items-center justify-center mb-10 ml-[400px]">
               {username}'s Data
            </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Contents?.map(({ _id, type, Link, title }) => (
              <Card
                key={_id}
                id={_id}
                type={type}
                link={Link}
                title={`${username}'s ${title}`} // Appending username to the title
                share={true}
              />
            ))}
          </div>
        </div>
      </div>
      
    )
}

