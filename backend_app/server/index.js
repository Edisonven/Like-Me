import express from "express";
import cors from "cors";
import postRouter from "../Routes/route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/posts", postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
