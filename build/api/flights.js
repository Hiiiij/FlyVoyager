import { app, connectDB } from "../src/flight-service/server.js";
const handler = async (req, res) => {
    console.log("request is here");
    await connectDB();
    await app(req, res);
};
export default handler;
