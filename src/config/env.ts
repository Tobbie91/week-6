import dotenv from "dotenv";
dotenv.config();

export default FILE_HOST:
    process.env.NODE_ENV ==="development"
         ? "http://localhost:2022"
         : "http://localhost:2022"
