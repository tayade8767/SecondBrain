 
import { useRef, useState } from "react"
import { CrossIcon } from "../Icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { BACKEND_URL } from "../Config"
import axios from "axios"


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    Linkdin = "linkdin",
    Image = "image",
    Other = "other",
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}



export function CreateContentModal({open,onClose}: CreateContentModalProps) {

const titleRef = useRef<HTMLInputElement>(null);
const linkRef = useRef<HTMLInputElement>(null);

const [type,setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        },{
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        })
        onClose();
    }


    return ( 
        <div>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="mt-4 ml-12">
                            <Input reference={titleRef} placeholder="Title"/>
                            <Input reference={linkRef} placeholder="Link" />
                        </div>
                        <div className="mt-6">
                            <h1 className="text-lg font-medium mb-4 text-center">Select Type</h1>
                            <div className="grid grid-cols-3 gap-3">
                                <Button
                                text="Youtube"
                                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                onclick={() => setType(ContentType.Youtube)}
                                />
                                <Button
                                text="Twitter"
                                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                onclick={() => setType(ContentType.Twitter)}
                                />
                                <Button
                                text="Linkdin"
                                variant={type === ContentType.Linkdin ? "primary" : "secondary"}
                                onclick={() => setType(ContentType.Linkdin)}
                                />
                                <Button
                                text="Instagram"
                                variant={type === ContentType.Instagram ? "primary" : "secondary"}
                                onclick={() => setType(ContentType.Instagram)}
                                />
                                <Button
                                text="Image"
                                variant={type === ContentType.Image ? "primary" : "secondary"}
                                onclick={() => setType(ContentType.Image)}
                                />
                                <Button
                                text="Other_URL"
                                variant={type === ContentType.Other ? "primary" : "secondary"}
                                onclick={() => setType(ContentType.Other)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button onclick={addContent} variant="primary" text="Submit" />
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}