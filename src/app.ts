import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
const port: number = 3000;

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// testing
app.get("/", (req:Request, res:Response) => {
  res.send("All things working!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
