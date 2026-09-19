import mongoose from "mongoose";
import dns from "node:dns";


const connectDB=async()=>{
    try{
        const dnsServers = (process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8")
            .split(",")
            .map((server) => server.trim())
            .filter(Boolean);

        dns.setServers(dnsServers);
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error connecting to mongoDB  : ${error.message}`);
        process.exit(1); //exit with failure
    }
};

export default connectDB;