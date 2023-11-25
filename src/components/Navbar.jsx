import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { auth, firestore, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const toast = useToast();
    const [loginAsAdmin, setLoginAsAdmin] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            const user = auth.currentUser;
            if (!user) {
                toast({
                    title: "",
                    description: "Failed to create account",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });

                // check if the user account is already saved in the database

                const userSnap = await getDocs(
                    query(
                        collection(firestore, "users"),
                        where("email", "==", user.email)
                    )
                );
                if (userSnap.size !== 0) return;

                // if not, save the user account in the database

                await addDoc(collection(firestore, "users"), {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: loginAsAdmin ? "Admin" : "Instructor",
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            h="56px"
            px="2rem"
            bg="white"
            borderBottom="1px solid #E2E8F0"
        >
            <Text fontSize="xl" fontWeight="bold">
                {user?.role ?? "Lecture"}
            </Text>

            <HStack spacing={8}>
                {!user ? (
                    <Button
                        onClick={() => setLoginAsAdmin(!loginAsAdmin)}
                        colorScheme={loginAsAdmin ? "blue" : "gray"}
                    >
                        Login as Admin
                    </Button>
                ) : null}

                <Button
                    onClick={
                        user ? () => handleLogout() : () => handleGoogleLogin()
                    }
                >
                    {user ? "Sign Out" : "Sign In"}
                </Button>
            </HStack>
        </HStack>
    );
}
