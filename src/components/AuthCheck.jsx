import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function AuthCheck({ children }) {
    const { user } = useContext(AuthContext);

    if (user) {
        return children;
    }

    return (
        <Box p="2rem">
            <Text fontWeight="bold">Please login to continue</Text>
        </Box>
    );
}
