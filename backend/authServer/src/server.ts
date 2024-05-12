import express from "express";
import authRouter from "./router/authRouter";
import { dbConnect } from "./config/db.config";
import cors from "cors";
import usersRouter from "./router/usersRouter";

const PORT = process.env.PORT || 8080;
export const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRouter);
app.use("/auth", authRouter);

const start = async () => {
  try {
    dbConnect();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
