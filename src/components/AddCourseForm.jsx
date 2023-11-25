import {
    Button,
    FormControl,
    Heading,
    Input,
    Select,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function AddCourseForm() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        level: "",
    });
    const toast = useToast();

    return (
        <VStack
            alignItems="start"
            w="50%"
            as="form"
            onSubmit={async (e) => {
                e.preventDefault();

                await addDoc(collection(firestore, "courses"), {
                    id: uuid(),
                    ...formData,
                });

                toast({
                    title: "Course Added",
                    description: "Course has been added successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }}
        >
            <Heading size="md" mb="1rem" textAlign="start">
                Add Course
            </Heading>

            <FormControl>
                <Input
                    placeholder="Course Name"
                    value={formData.name}
                    type="text"
                    required
                    minLength={3}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                />
            </FormControl>

            <FormControl>
                <Input
                    placeholder="Course Description"
                    value={formData.description}
                    type="text"
                    required
                    minLength={3}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />
            </FormControl>

            <FormControl>
                <Input
                    placeholder="Course Image"
                    value={formData.image}
                    type="text"
                    required
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            image: e.target.value,
                        })
                    }
                />
            </FormControl>

            {/* Dropdown for course level */}

            <FormControl>
                <Select
                    placeholder="Select Course Level"
                    value={formData.level}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            level: e.target.value,
                        })
                    }
                    required
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Select>
            </FormControl>

            <Button type="submit">Add Course</Button>
        </VStack>
    );
}
