import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AuthProvider from "./components/AuthProvider";
import MainContent from "./components/MainContent";

export default function App() {
    return (
        <AuthProvider>
            <ChakraProvider>
                <Navbar />
                <MainContent />
            </ChakraProvider>
        </AuthProvider>
    );
}
