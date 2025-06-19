import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

// Create an empty array where we'll export future Inngest functions
export const syncUserCreation = inngest.createFunction(
{
    id:'sync-user-from-clerk'
},
{
    event:'clerk/use.created'},
    async ({event})=>{
        const {id,first_name,last_name,email_addreses,image_url,} = event.data
        const userData ={
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name +''+last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)

export const syncUserUpdation = inngest.createFunction({
    id: 'update-user-from-clerk'
    },
{
    event: 'clerk/user.updated'
}, 
async({event})=>{
         const {id,first_name,last_name,email_addreses,image_url,} = event.data
        const userData ={
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name +''+last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)   
}
)
