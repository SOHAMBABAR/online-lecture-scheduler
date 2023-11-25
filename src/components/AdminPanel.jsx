import { VStack } from "@chakra-ui/react";
import InstructorsList from "./InstructorsList";
import CoursesList from "./CourseList";
import AssignLecture from "./AssignLecture";

export default function AdminPanel() {
    return (
        <VStack p="2rem" alignItems="start">
            <InstructorsList />
            <CoursesList />
            <AssignLecture />
        </VStack>
    );
}
