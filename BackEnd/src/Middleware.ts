
import { NextFunction,Request,Response } from "express";

import { JWT_SECRET } from "./config";

import jwt from "jsonwebtoken";

export const userMiddleware = async (req: Request,res: Response,next: NextFunction) => {
    
    const header = req.headers["authorization"];

    const decodedtoken = jwt.verify(header as string, JWT_SECRET);

    if(decodedtoken) {
         // @ts-ignore
        req.userId = decodedtoken.id;
        next();
    } else {
        res.status(401).json({error: 'Not authenticated'});
    }

}
