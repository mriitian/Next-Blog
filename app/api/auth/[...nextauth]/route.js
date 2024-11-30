import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

import {connectToDb} from '@utils/database'
import User from "@models/User";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session}) {
            const SessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = SessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                await connectToDb();
                const UserExists = await User.findOne({
                    email:profile.email
                })
    
                if(!UserExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
    
                    })
                }
    
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
    
})

export {handler as GET, handler as POST};