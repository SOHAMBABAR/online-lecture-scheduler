import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import AuthCheck from "./AuthCheck";
import AdminPanel from "./AdminPanel";
import InstructorPanel from "./InstructorPanel";

export default function MainContent({ children }) {
    const { user } = useContext(AuthContext);

    if (user?.role === "Admin") {
        return (
            <AuthCheck>
                <AdminPanel />
            </AuthCheck>
        );
    }

    return (
        <AuthCheck>
            <InstructorPanel />
        </AuthCheck>
    );
}
