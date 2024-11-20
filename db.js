import dotenv from "dotenv";
dotenv.config();
import postgres from "postgres";

const connect = postgres({
  host: "localhost",
  port: 5432,
  database: "blanja",
  username: "postgres",
  password: "password",
});

export default connect;
