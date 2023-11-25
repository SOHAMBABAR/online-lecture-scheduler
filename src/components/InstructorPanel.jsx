import { Heading, List, ListItem, Text, VStack } from "@chakra-ui/react";
import {
    collection,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { firestore } from "../lib/firebase";
import { AuthContext } from "./AuthProvider";

export default function InstructorPanel() {
    const { user } = useContext(AuthContext);
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        if (user.email) {
            const unsubscribe = onSnapshot(
                query(
                    collection(firestore, "lectures"),
                    where("instructorEmail", "==", user?.email)
                ),
                async (snapshot) => {
                    const results = snapshot.docs.map((doc) => doc.data());
                    console.log({ results });

                    for (let i = 0; i < results.length; i++) {
                        const snap = await getDocs(
                            query(
                                collection(firestore, "courses"),
                                where("id", "==", results[i].courseId)
                            )
                        );

                        results[i].courseName = snap.docs[0].data().name;
                    }

                    setLectures(results);
                }
            );

            return unsubscribe;
        }
    }, []);

    return (
        <VStack p="2rem" alignItems="start">
            <Heading size="lg" mb="1rem" textAlign="start">
                Lectures Scheduled
            </Heading>

            <List w="50%">
                {lectures.map((lecture) => (
                    <ListItem
                        key={lecture.id}
                        mb="0.5rem"
                        bgColor="whitesmoke"
                        p="0.5rem"
                        borderRadius="0.5rem"
                    >
                        <Heading size="sm">{lecture.courseName}</Heading>
                        <Text>{lecture.date}</Text>
                    </ListItem>
                ))}
            </List>
        </VStack>
    );
}
