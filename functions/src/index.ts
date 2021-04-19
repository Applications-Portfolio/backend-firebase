import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import gqlServer from "./graphql";

admin.initializeApp();
const db: admin.firestore.Firestore = admin.firestore();
db.settings({ignoreUndefinedProperties: true});
const server = gqlServer(db);

export const apollo = functions.https.onRequest(server);
