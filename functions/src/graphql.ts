import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import {ApolloServer, PlaygroundConfig} from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";

const gqlServer = (
    firestoreDatabase: admin.firestore.Firestore,
    configFirebase: functions.config.Config,
): express.Express => {
  const app = express();

  const playground: boolean | PlaygroundConfig = (() => {
    if (configFirebase?.apollo?.env === "development") {
      return {
        endpoint: "https://us-central1-dev-podcastie.cloudfunctions.net/apollo",
      };
    }
    return true;
  })();

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground,
    context: {
      firestoreDatabase,
    },
  });

  apolloServer.applyMiddleware({app, path: "/"});

  return app;
};

export default gqlServer;
