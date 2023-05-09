import React, { createContext, useContext, useState } from "react";
import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, where, query, CACHE_SIZE_UNLIMITED, initializeFirestore, getDocsFromCache, persistentLocalCache,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyC9z1KiaNJcxDMNqKPytaEyJyz007BPhUw",
    authDomain: "health-tracker-c2db1.firebaseapp.com",
    projectId: "health-tracker-c2db1",
    storageBucket: "health-tracker-c2db1.appspot.com",
    messagingSenderId: "530232649065",
    appId: "1:530232649065:web:b4a2d56f2dfd3b52a6c9f8"
};

const firebaseFunctions = (() => {
    let app;
    let database;
    // let storage;
    let auth;

    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        database = initializeFirestore(app, {localCache: persistentLocalCache(CACHE_SIZE_UNLIMITED), });

        storage = getStorage();
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        })

    }
    else {
        app = getApp();
        database = getFirestore(app);
        storage = getStorage();
        auth = getAuth(app)
    }

    let currentUser = auth.currentUser;

    return {
        signIn: (email, password, setSignedIn) => {
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                currentUser = userCredential.user;
                setSignedIn(true);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage)
                console.log("Issue with login");
            });
        },

        // Creates a user!
        createUser: (name, email, password) => {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                currentUser = userCredential.user;

                // This will be where you generate the tags for the person in the database upon account creation.
                // TODO: Add later
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                console.log("Issue with creating account");
            });
        },

        signOut: (setSignedIn, auth) => {
            signOut(auth).then(() => {
                setSignedIn(false);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                console.log("Issue with signing out");
            })
        },

        createTransaction: async (amount, transactionName, description, isExpense, date, selectedCategories, selectedProject, groupName, currentGroup) => {

            const docRef = await addDoc(collection(database, `transactions/users/${currentGroup}`), {
                amount: amount,
                date: date,
                transactionName: transactionName,
                description: description,
                isExpense: isExpense,
                category: selectedCategories,
                project: selectedProject,
                group: groupName,
                timestamp: new Date()
            })

            return true;
        },

        getMonthTransactions: async (currentMonth, activeGroup) => {
            let thisMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            let nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
            const q = query(collection(database, `transactions/users/${activeGroup}`), where("date", ">=", thisMonth), where("date", "<", nextMonth));

            let data = [];

            try {
                const snapshot = await getDocsFromCache(q);
                if (snapshot.size > 0) {
                    data = snapshot.docs.map(doc => {
                        let documentId = doc.id;
                        return {...doc.data(), documentId}
                    });
                }
            } catch (e) {
                console.log("ERROR!")
                console.log(e);
            }
            return data;
        },

        createBudgetItem: async (amount, description, optionalDetails, date, percentage, recurring, selectedCategories, activeGroup) => {

            if (!recurring) {
                const docRef = await addDoc(collection(database, `budget/users/${activeGroup}`), {
                    amount: amount,
                    date: date.getTime(),
                    description: description,
                    optionalDetails: optionalDetails,
                    category: selectedCategories,
                    isPercentage: percentage,
                    isRecurring: recurring,
                    timestamp: new Date().getTime()
                })
            } else {
                const docRef = await addDoc(collection(database, `budget/users/${activeGroup}/recurring`), {
                    amount: amount,
                    date: date.getTime(),
                    description: description,
                    optionalDetails: optionalDetails,
                    category: selectedCategories,
                    isPercentage: percentage,
                    isRecurring: recurring,
                    timestamp: new Date().getTime()
                })
            }
        },
    }
})();

export const FirebaseProvider = ({ children }) => {
    const [signedIn, setSignedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [firebase] = useState(firebaseFunctions);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [currentTransactions, setCurrentTransactions] = useState([]);
    const [currentBudgets, setCurrentBudgets] = useState([]);
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(null);
        }
    });

    state = {
        firebase: firebase,
        signedIn: signedIn,
        setSignedIn: setSignedIn,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        currentGroup: currentGroup,
        setCurrentGroup: setCurrentGroup,
        currentTransactions: currentTransactions,
        setCurrentTransactions, setCurrentTransactions,
        currentBudgets: currentBudgets,
        setCurrentBudgets: setCurrentBudgets,
        auth: auth
      }

      return (
        <FirebaseContext.Provider value={state}>
          {children}
        </FirebaseContext.Provider>
      )
}

export const useFirebase = () => useContext(FirebaseContext);

export default useFirebase;

