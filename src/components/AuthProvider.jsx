import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth, firestore } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                (async () => {
                    const userSnap = await getDocs(
                        query(
                            collection(firestore, "users"),
                            where("email", "==", loggedInUser.email)
                        )
                    );

                    if (userSnap.size !== 0) {
                        setUser(userSnap.docs[0].data());
                    } else {
                        setUser(null);
                    }
                })();
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}
