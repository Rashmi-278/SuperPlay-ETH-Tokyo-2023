import { Box, HStack } from "@chakra-ui/react";
import Header from "../components/Header";
export default function Index() {
        return (
            <Box height="100vh"  objectFit='fill' 
            pos="relative"
            bgColor={'#000'}
            >
            <Header />
            <HStack>
            <Box
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            >
            <Box
            as="h1"
            fontSize="6xl"
            fontWeight="bold"
            color="white"
            >
            Start your journey for free

        
            </Box>
            </Box>
            </HStack>
            </Box>
            
        )
}