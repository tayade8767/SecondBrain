/* eslint-disable @typescript-eslint/no-explicit-any */
 

interface InputProps {
    placeholder: string;    //    it justfor getting the input for puttting the text
    reference?: any;      //   optional reference to get the value of the input field 
}


    export function Input(props: InputProps) {
            return (
                <div>
                    {/* this input feild is for the taking input from all the places its just a normal/common input box */}
                    <input placeholder={props.placeholder} ref={props.reference} type={"text"} className="px-4 py-2 border rounded m-2" />
                </div>
            )
    };
