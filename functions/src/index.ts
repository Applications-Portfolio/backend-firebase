import * as functions from "firebase-functions";
import * as express from "express";
import {Request, Response} from "express";

const app = express();

const getExample = (req: Request, res: Response) => {
  functions.logger.info(
      "Get Example from login path /", {structuredData: true},
  );
  res.send("Get login root");
};

const postExampleAuth = (req: Request, res: Response) => {
  functions.logger.info(
      "Post Example from login path /auth", {structuredData: true},
  );
  res.send("Login auth");
};

const postExampleRegister = (req: Request, res: Response) => {
  functions.logger.info(
      "Post Example from login path /register", {structuredData: true}
  );
  res.send("Login Register");
};

app.get("/", getExample);
app.post("/auth", postExampleAuth);
app.post("/register", postExampleRegister);

export const login = functions.https.onRequest(app);
