 
import { DeleteIcon } from "../Icons/DeleteIcons";
import { ShareIcon } from "../Icons/ShareIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { LinkedinIcon } from "../Icons/LinkedinIcon"
import { InstagramIcon } from "../Icons/InstagramIcon";
import axios from "axios";
import { BACKEND_URL } from "../Config";
// import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "other" | "image" | "linkdin" | "instagram";
  id?: string;
  share?: boolean;
}

export function Card({ id,title, link = "#", type, share }: CardProps) {

  // console.log(id, title, link, type)

  // const navigate = useNavigate();

const handledelete = async () => {
      // console.log("deleted content",id);
      const response = await axios.post(`${BACKEND_URL}/api/v1/content/delete`, {
        contentId : id,
      },{
        headers: {
          "Authorization": localStorage.getItem("token"),
        }
      })
      if (response.status === 200) {
        toast.success("Content deleted successfully");
      } else {
        toast.error("Failed to delete content");
      }
}



  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-300 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out max-w-72 sm:min-w-64 md:min-w-80 lg:min-w-[350px]">
      <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4">
        {/* Icon and Title Section */}
        <div className="flex items-center text-lg font-bold flex-grow min-w-0">
          <div
            className={`text-3xl pr-3 ${
              type === "twitter" ? "text-blue-500" : "text-red-900"
            }`}
          >
            {type === "twitter" && <TwitterIcon />}
            {type === "linkdin" && <LinkedinIcon />}
            {type === "youtube" && <YoutubeIcon />}
            {type === "instagram" && <InstagramIcon />}
          </div>
          {/* Ensure long text truncates properly */}
          <span className="truncate text-gray-800 overflow-hidden">
            {title}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
            title="Share"
          >
            <ShareIcon />
          </a>
          <button  onClick={handledelete}
            className="text-gray-500 hover:text-red-600 transition-colors"
            title="Delete"
          >
            {!share ? <DeleteIcon /> : ""}
          </button>
        </div>
      </div>

      {/* Media Section */}
      <div className="pt-6">
        {type === "youtube" && (
          <iframe
              className="w-full aspect-video rounded-xl shadow-md"
              src={link.replace("youtu.be/", "www.youtube.com/embed/")}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
        ></iframe>
        
        )}
        {type === "twitter" && (
            <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
        )}
        {type === "linkdin" && (
          <div className="flex flex-col items-center justify-center gap-4 p-10 bg-gray-50 rounded-2xl shadow-lg">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Share on LinkedIn"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAhFBMVEX///8KZsIAWr4AZMEAYcAAYsEAWL7L2O4AXb/a5PMWa8QkcMXW4fFxmdQAWb4AX8CBpNjN2u/x9fuzx+YAVb1Yis5wmNRikNGgueB5ntYAUbzp7/j3+v3z9vtplNKbtd+5y+hUh82rweSPrtwydceHqNpCfcpKgsvD0uuet+AASboARbniUg0OAAAGaElEQVR4nO2b6WKCOhCFkYSIWsEF64ZK3dv7/u93IZlh0faCtgrtPd8vUiTLIZnMTKhlAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADfZdW5hbp7+xTWgX0Dyo3q7vDjmbqtmxCLYd1dfjTL4DZJWi3nre4+P5q2fasmolt3nx8NNLkmp4kQjdIk7ITPaeiKVBOpjie7ir39QU2W637C6/b6VrgOvOBtVVbD3FQw+14/ItOPKRVZE3uQlDbqqZq8BDLBtF2k5yfvySmbKl0/qcB9/V4/3j3djwUVSRP/YIrbcvPyk5qY1uS1JjMzY91DSQ09vd5l/3v9oNYUFY0mwufb+1Kj8hRNTqJaWw/UxFnz7Z3fCE2OpIlTUsMDNZFzvv3eDE0GUt9xpp88leeRa6fHt6dOIzRZBnqwi5eSGh6oSctrc1/KJHmOJtbQc303iMpqeKQmwtdJgFG33G97jiZWON5tS92Th2rSEmo9Hs+9Cq7skzSpxkM1ie2Z68pyRf5PmggiX9DNubbt+vLpmoSG7Jq6u+v3B7PM8l5pEob5J2O7tHk9HU/rzbWxjuan/XG6S7JBX9iTLqHbSK+l1x8Ph+ftay4SeoomnQ+V8HGOr7f6OoibjYSd+PK+14o+16Sz0I+pYLFMiquDa7syfrvSVd2o0MBO6RtOXNf5C01syrOGccAj2aFWap7GG5tAPFUT6layHY51j8XRGmR9CMihKmqykjTPlZZkpvzMPgo1yaofdXPvONhtP9eE5tZI5br4zzjffw4P69LktM0HqGr7iSY9kiDQ6dG3i9jN36eS+IW9xKWApoImYTEAG7PlqUmTbmEHEPa1Jif6RaDf5ZE8ckfS7Gn57BVfehxUrDJPLuhVjMuqc4smrYtxuONLTV5pPXibpNQ3JelND4M9+RjqrCs/pPFLuqvcq8nWr1WTuGVXucqmQZhQKKfJxiOxtEBD45C7a20Rz67+nQlhRuyrO548Hh0vjWbu0GSp6tVE+ON4gO0W+wtFTSIaqW+OFYyJkJxsImuoEkPDob870RtLZ8p2p5om7z2PlE4gsevSRJm9kV5NKyho8kKSOMaQdpSZWGmFJrbVWyotlyxfteMGqPyfmvTjdSj8NGY+1qpJ6oRQ6K73W9JkvqIlJVrmDZq5kKVA2FDvWa5kb085Vd53rI7RnmNm6kxdmqSHsuRhecm0MZqIKdt/d5kfpTiumWzYXN05a21oV9bk3Tzt76jcl3Vq4vHxfWTKdqZJegzj8m84SHEY3m5XbE6CfHOqsiZGg2zSzmvVRNEUsM65Lhc1ydbDV2mguBKTwhMy35yx21U0mZiFmyZrG6JJPhzhtUNeGB8/fKmJt+RRfFMTdv8aq4mcD3kzIivBgY97QRwbHszsv3Pt/B5NXq21JBFMbo5s7DQaF9murJmfVU3cYGN/kyY8MxxjUoz7LvZXFWfZkVP2pzeneZpcn/bdrsmZVo+rd0laS142GbbpV2dka2zeTq0NObJN0iQ2eH6O4OUeTXj1UKLAGN3UX4ld/4AP2vm4xl7rm8s1BUrN0iTNfGq8+zTJ7GriytK0EbZWorOOizYllTgMaEnVnUy6Ks1BNEuTAvadmvDqcbSlmNBQfbU/CjNu6ZhP8SapCrFPl2v4D2qSrh5jKXo88ixH4hlPKyym2eLnq8c7v00TXj2txCJZ4f7iCyOhOCTsFM+x7N2+cT7bj2nCq0dIHR0Pgny60vey9PKy56aqJPnuboM0WXz2WXJycN75MJf6LMP86iONdxbpzyzhJZcBRx/8/XNgvJTlOtAnFvowY1D45mkmbX1H2iJuQ+pqPvgQ6ZOzjK/incFPa7Jqf0rsiobtYUJ7lIyMrnlMIyonHuvQPMG+R8hVnEf0h2hw6orucRBdNd4+vPW6x7kOBoamRr5j01yYa/pOEl2a6zkHnXsq7386p9RQ+GzU0V+5SZM1MtdssS7KRpPZ++7PfmN+5zfDyW4Xjcsq/6Xcp8nW2kSDcFfXR70PZni7Jr14e7Rm48No+FdXz83/l+HPE002y411/qv/4LRdOOIW/MQfeum0rXZ4/6c0Taf91rsF4/qco+XLofxzs/8X4fCvLhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4o/wLt+503AaBG84AAAAASUVORK5CYII="
                alt="LinkedIn Icon"
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold">Share on LinkedIn</span>
            </a>
            <div className="text-center text-gray-700 text-sm">
              Click the button above to check your LinkedIn post.
            </div>
          </div>        
        )}
        {type === "instagram" && (
                 <blockquote
                 className="instagram-media"
                 data-instgrm-captioned
                 data-instgrm-permalink={link}
                 data-instgrm-version="14"
               >
                 <div className="p-4">
                   <a      
                     href={link}
                     className="bg-white text-center no-underline w-full block"
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     <div className="flex flex-row items-center">
                       <div className="bg-gray-100 rounded-full w-10 h-10 mr-4"></div>
                       <div className="flex flex-col flex-grow justify-center">
                         <div className="bg-gray-100 rounded h-3.5 mb-1.5 w-24"></div>
                         <div className="bg-gray-100 rounded h-3.5 w-16"></div>
                       </div>
                     </div>
                     
                     <div className="py-[25%]"></div>
                      <div className="pt-2">
                       <div className="text-[#3897f0] font-sans text-sm font-semibold leading-[18px]">
                         View this post on Instagram
                       </div>
                      </div>
                   </a>
                 </div>
               </blockquote>
        )}
        {type === "image" && (
          <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-lg">
            <a href={link} target="_blank">
              <img 
                src={link}
                alt="Image" 
                className="max-w-full h-auto rounded-lg"
              />
            </a>
          </div>
        )}
        {type === "other" && (
          <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-lg">
            <a href={link} target="_blank">
              <img 
                src="data:image/png;base64,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"
                alt="Image" 
                className="max-w-full h-auto rounded-lg"
              />
            </a>
          </div>
        )}
      </div>
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
  );
}
