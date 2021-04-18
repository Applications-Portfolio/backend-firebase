import * as admin from "firebase-admin";
import * as express from "express";
import {ApolloServer} from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";

const gqlServer = (
    firestoreDatabase: admin.firestore.Firestore
): express.Express => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true,
    context: {
      firestoreDatabase,
    },
  });

  apolloServer.applyMiddleware({app, path: "/"});

  return app;
};

export default gqlServer;
