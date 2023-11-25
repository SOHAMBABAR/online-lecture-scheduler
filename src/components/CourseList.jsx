import {
    Divider,
    HStack,
    Heading,
    Image,
    List,
    ListItem,
    Text,
    VStack,
} from "@chakra-ui/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";

export default function CoursesList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, "courses")),
            (snapshot) => {
                const result = snapshot.docs.map((doc) => doc.data());
                setCourses(result);
            }
        );

        return unsubscribe;
    }, []);

    return (
        <VStack alignItems="start" w="100%">
            <Heading size="lg" mb="1rem" textAlign="start">
                Courses
            </Heading>

            <Divider mb="1rem" />

            <HStack gap="0.5rem" w="100%" alignItems="start">
                <List w="50%" maxH="300px" overflowY="auto">
                    <Heading size="md" mb="1rem" textAlign="start">
                        Current Courses
                    </Heading>

                    {courses.map((course) => (
                        <ListItem
                            key={course.id}
                            mb="0.5rem"
                            p="0.5rem"
                            borderRadius="0.5rem"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <Image
                                src={course.image}
                                sx={{
                                    height: "200px",
                                    w: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <Heading size="lg">{course.name}</Heading>
                            <Text>{course.description}</Text>
                        </ListItem>
                    ))}
                </List>

                <Divider orientation="vertical" />
                <AddCourseForm />
            </HStack>
        </VStack>
    );
}
