import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";

export default function AssignLecture() {
    const toast = useToast();
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        course: "",
        instructor: "",
        date: "",
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = courses.find((course) => course.id === formData.course);
        const instructor = instructors.find(
            (instructor) => instructor.email === formData.instructor
        );

        console.log({ course, instructor });

        const lectureSnaps = await getDocs(
            query(
                collection(firestore, "lectures"),
                where("instructorEmail", "==", instructor.email),
                where("date", "==", formData.date.split("T")[0])
            )
        );
        if (lectureSnaps.docs.length) {
            toast({
                title: "Slot is not available",
                description: "",
                isClosable: true,
                duration: 9000,
                status: "error",
            });
            return;
        }

        await addDoc(collection(firestore, "lectures"), {
            date: formData.date.split("T")[0],
            instructorEmail: instructor.email,
            courseId: course.id,
        });

        toast({
            title: "Slot is scheduled",
            description: "",
            isClosable: true,
            duration: 9000,
            status: "success",
        });
    };

    return (
        <VStack
            alignItems="start"
            w="50%"
            my="4rem"
            as="form"
            onSubmit={handleSubmit}
        >
            <Heading size="lg" mb="1rem" textAlign="start">
                Assign Lecture
            </Heading>

            <Divider mb="1rem" />

            <FormControl>
                <FormLabel>Instructor</FormLabel>

                <Select
                    placeholder="Select Instructor"
                    value={formData.instructor}
                    onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                    }
                    required
                >
                    {instructors.map((instructor) => (
                        <option key={instructor.id} value={instructor.email}>
                            {instructor.username}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Course</FormLabel>

                <Select
                    placeholder="Select Course"
                    value={formData.course}
                    onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                    }
                    required
                >
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Date</FormLabel>

                <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                    }
                    required
                />
            </FormControl>

            <Button mt="1rem" type="submit">
                Schedule lecture
            </Button>
        </VStack>
    );
}
