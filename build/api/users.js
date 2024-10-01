import { app, connectDB } from "../src/user-service/server.js";
const handler = async (req, res) => {
    await connectDB();
    await app(req, res);
};
export default handler;
