/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-types */
import * as admin from "firebase-admin";
import {
  Address,
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
    readUser(parent: object, args: Pick<User, "phone">, context: {
      firestoreDatabase: admin.firestore.Firestore
    }): Promise<User> {
      return new Promise(async (resolve, reject) => {
        try {
          const {firestoreDatabase} = context;
          const userDoc = await firestoreDatabase.
              collection("users").doc(args.phone).get();
          const user: User | undefined = userDoc.data() as User | undefined;

          if (!userDoc.exists || user === undefined) {
            reject(new Error("User not found"));
          }

          resolve(user as User);
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
    createAddress(parent: object, args: Address, context: {
      firestoreDatabase: admin.firestore.Firestore
    }): Promise<Address> {
      return new Promise(async (resolve, reject) => {
        try {
          const {firestoreDatabase} = context;
          const {
            userId,
          } = args;
          const userDoc = await firestoreDatabase.
              collection("users").doc(userId).get();
          const user: User | undefined = userDoc.data() as User | undefined;

          if (!userDoc.exists || user === undefined) {
            reject(new Error("User not found"));
          }
          const {
            city,
            complement,
            neighborhood,
            number,
            state,
            street,
            zipCode,
          } = args;

          const address: Address = {
            userId: user!.phone,
            city,
            complement,
            neighborhood,
            number,
            state,
            street,
            zipCode,
          };

          await firestoreDatabase.collection("addresses")
              .doc().set(address);

          resolve(args);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  User: {
    addresses(parent: User, args: object, context: {
      firestoreDatabase: admin.firestore.Firestore
    }): Promise<[Address?]> {
      return new Promise(async (resolve, reject) => {
        try {
          const {firestoreDatabase} = context;
          const snapshot = await firestoreDatabase.
              collection("addresses").where("userId", "==", parent.phone).get();
          const response: [Address?] = [];

          snapshot.forEach((element) => {
            response.push(element.data() as Address);
          });

          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};

export default resolverFunctions;
