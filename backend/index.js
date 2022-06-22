import express from "express";
import connectMongo from "./db.js";
import helmet from "helmet";
import morgan from "morgan";
import noteRouter from "./routes/note.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
const app = express();
const port = 80;
await connectMongo();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/note", noteRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Server @${port}`);
});
