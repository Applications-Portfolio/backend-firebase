import * as functions from "firebase-functions";
import gqlServer from "./graphql";

const server = gqlServer();
export const apollo = functions.https.onRequest(server);
