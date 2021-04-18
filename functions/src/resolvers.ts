/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-types */
import * as admin from "firebase-admin";
import {
  User,
} from "./models";

const resolverFunctions = {
  Query: {
    readUsers: (): User | number => 0,
  },
  Mutation: {
    createUser(parent: object, args: User, context: {
      firestoreDatabase: admin.firestore.Firestore
    }): Promise<User> {
      return new Promise(async (resolve, reject) => {
        try {
          const {firestoreDatabase} = context;
          const docRef = firestoreDatabase.collection("users").doc(args.phone);
          await docRef.set({
            phone: args.phone,
            email: args.email,
            name: args.name,
          });
          resolve(args);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};

export default resolverFunctions;
