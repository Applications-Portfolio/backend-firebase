/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-types */
import * as admin from "firebase-admin";
import {
  User,
} from "./models";

const resolverFunctions = {
  Query: {
    readUsers(parent: object, args: object, context: {
      firestoreDatabase: admin.firestore.Firestore
    }): Promise<[User?]> {
      return new Promise(async (resolve, reject) => {
        try {
          const {firestoreDatabase} = context;
          const snapshot = await firestoreDatabase.collection("users").get();
          const response: [User?] = [];

          snapshot.forEach((element) => {
            response.push(element.data() as User);
          });

          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
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
