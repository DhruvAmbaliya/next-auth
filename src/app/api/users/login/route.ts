import dbConfig from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

dbConfig()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody

        console.log(reqBody);
        
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({ error : "User does not exists" },
                {status : 400}
            )
        }

        const validpassword = await bcryptjs.compare(password, user.password);
        if(!validpassword){
            return NextResponse.json({ error : "invalid password" }, { status : 400})
        }

        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: "1d"})

        const response = NextResponse.json({message:"login success",success:true})
        response.cookies.set("token",token,{
            httpOnly: true,
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}