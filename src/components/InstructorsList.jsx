import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";
import {
    Button,
    Divider,
    FormControl,
    HStack,
    Heading,
    Input,
    List,
    ListItem,
    VStack,
} from "@chakra-ui/react";

export default function InstructorsList() {
    const [instructors, setInstructors] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, "instructors")),
            (snapshot) => {
                const instructors = snapshot.docs.map((doc) => doc.data());
                console.log({ instructors });
                setInstructors(instructors);
            }
        );

        return unsubscribe;
    }, []);

    return (
        <VStack alignItems="start" w="100%">
            <Heading size="lg" mb="1rem" textAlign="start">
                Instructors
            </Heading>

            <Divider mb="1rem" />

            <HStack gap="0.5rem" w="100%" alignItems="start">
                <List w="50%">
                    <Heading size="md" mb="1rem" textAlign="start">
                        Current Instructor
                    </Heading>

                    {instructors.map((instructor) => (
                        <ListItem
                            key={instructor.id}
                            mb="0.5rem"
                            bgColor="whitesmoke"
                            p="0.5rem"
                            borderRadius="0.5rem"
                        >
                            {instructor.username} - {instructor.email}
                        </ListItem>
                    ))}
                </List>

                <Divider orientation="vertical" />

                <VStack
                    alignItems="start"
                    w="50%"
                    as="form"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        await addDoc(collection(firestore, "instructors"), {
                            email,
                            username,
                            role: "Instructor",
                        });

                        setEmail("");
                        setUsername("");
                    }}
                >
                    <Heading size="md" mb="1rem" textAlign="start">
                        Add Instructor
                    </Heading>

                    <FormControl>
                        <Input
                            placeholder="Username"
                            value={username}
                            type="text"
                            required
                            minLength={3}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <Input
                            placeholder="Email"
                            value={email}
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <Button type="submit">Add Instructor</Button>
                </VStack>
            </HStack>
        </VStack>
    );
}
