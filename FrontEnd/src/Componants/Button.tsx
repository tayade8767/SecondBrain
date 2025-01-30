 
/* eslint-disable @typescript-eslint/no-wrapper-object-types */

import { ReactElement } from "react";

interface ButtonProps {
    text: String;
    variant: "primary" | "secondary";
    startIcon?: ReactElement;
    fullwidth?: Boolean;
    loding?: Boolean;
    onclick?: () => void;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",           //   style for primar6y varient
    "secondary": "bg-purple-200 text-purple-600",     //   style for secoundary varient
}

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center"


export function Button(props: ButtonProps) {
    return (
        <button onClick={props.onclick}  className={ variantClasses[props.variant] + " " + defaultStyle + `${props.fullwidth ? "w-full flex justify-center items-center" : ""} ${props.loding ? "opacity-45" : ""}`} >
            <div className="pr-2">
                {props.startIcon}
            </div>
            {props.text}
        </button>
    );
}

