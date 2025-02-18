import express from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from "cors";
 
import { z } from 'zod'

import { JWT_SECRET } from './config';

import { ContentModel,LinkModel,UserModel } from './db';
import { userMiddleware } from './Middleware';
import { random } from './utils';


const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If cookies are being used
  }));


// user SignUp

app.post("/api/v1/signup",async (req,res) => {

    //   validate the user credentials like email and password using zod

    const userSchema = z.string().min(3).max(10).regex(/^[a-zA-Z]+$/);

    // console.log("Request body:", req.body);
    
    
    const passwordSchema = z.string().min(8).max(20)
                .regex(/[A-Z]/, { message: "Password must include at least one Upper letter" })
                .regex(/[a-z]/, { message: "Password must include at least one Lower letter" })
                .regex(/[0-9]/, { message: "Password must include at least one Number" })
                .regex(/[@$!%?&#]/, { message: "Password must include at least one special character (@$!%?&#)." });
    
    try {

        const { username,password } = req.body;
        // console.log("Username:", username);
        // console.log("Password:", password);

        const usernamepresentornot = await UserModel.findOne({ username });

        if(usernamepresentornot) {
            res.status(400).json({ message: "Username is alrady present " })
        }

        userSchema.parse(username);
        passwordSchema.parse(password);

        const hashedpassword = bcrypt.hashSync(password, 10);

        await UserModel.create({
            username: username,
            password: hashedpassword,
        });

        res.status(200).json({ message: "User signed up" }); // Send success response.

    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error || "Invalid input" });
    }

});

//   user signin
app.post("/api/v1/signin", async (req,res) => {

    const { username, password } = req.body;

    const Userexist = await UserModel.findOne({ username });

    if(!Userexist) {
        res.status(404).json({ message: "User is not present in dataBase"});
    }

    const hash = Userexist?.password;


    // const isPasswordCorrect = bcrypt.compare(password, hash);//-
    const isPasswordCorrect = await bcrypt.compare(password, hash ?? '');

    if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid password" });
    }

    if(Userexist && isPasswordCorrect) {
        const token = jwt.sign({ id: Userexist._id }, JWT_SECRET);
        // console.log(token);
        res.status(200).json({ token })    //   sending the token to the frontend to recognize the user
    }

})

//    adiing the content

app.post("/api/v1/content",userMiddleware , async(req,res) => {

    const { link,type,title } = req.body;

    // console.log(link)

    const newContent = await ContentModel.create({
        title: title,
        Link:link,
        tags: [],
        type:type,
        userId: req.userId,
    })

    //   i can again check with database is the content is stored properly or not in database but its not to important here

    if(!newContent) {
        res.status(400).json({ message: "Failed to add content" })
    }

    res.json({ message: "Content Added" });

})

//  fetching the content

app.get("/api/v1/content", userMiddleware ,async (req,res) => {

    //@ts-ignore

    const userId = req.userId;
    const content = await ContentModel.find({ userId: userId}).populate("userId","username");
    // console.log(content);
    res.status(200).json(content);

})

//   deleting the content of my second brain
app.post("/api/v1/content/delete", userMiddleware ,async (req,res) => {
    const contentId = req.body.contentId;
    const deletedContent = await ContentModel.findOneAndDelete({_id:contentId, userId: req.userId});
    // console.log(deletedContent);
    res.status(200).json({message: "deleted Content"});
})

app.post("/api/v1/brain/share", userMiddleware ,async (req,res) => {
    
    const { share } = req.body;

    if(share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if(existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = random(10);
        const newLink = await LinkModel.create({userId: req.userId, hash});
        res.json({ hash: newLink.hash });
    } else {
        //   it never came to else past because every time the share we are sending from frontend is share=true
        const deletedLink = await LinkModel.deleteOne({ userId: req.userId });          
        res.json({ message: "Link deleted" });
    }

});

// Route 7: Get Shared Content
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    // Find the link using the provided hash.
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }

    // Fetch content and user details for the shareable link.
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    // Optionally, you could use a simple API endpoint to send data to the frontend
    app.get('/status', (req, res) => {
        res.json({ message: "Connected to backend" });
    });
});


export default app;