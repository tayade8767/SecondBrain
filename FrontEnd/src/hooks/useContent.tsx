 
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config"; 

export function useContent() {
  const [Contents, setContents] = useState([]);

  async function refresh() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"), // Include the token from localStorage
        },
      });

      // console.log("Fetched content:", response.data); // Debugging fetched data
      setContents(response.data); // Update state with the content data
      // console.log("Fetchedsfewdfd content:", response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  useEffect(() => {
    refresh(); // Fetch data immediately when the component mounts

    // Log Contents whenever it updates
    // useEffect(() => {
    //   console.log("Contents updated:", Contents);
    // }, [Contents]);

    // Set up a polling interval to fetch content every 10 seconds
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { Contents, refresh };
}
