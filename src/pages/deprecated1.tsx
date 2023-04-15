import {
  Box,
  Button,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
export default function Index() {
  function useColorModeValue(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <Box height="100vh" objectFit="fill" pos="relative" bgColor={"#000"}>
      <Header />
      <VStack>
        <Grid></Grid>
        <VStack>
          <Box as="h1" fontSize="6xl" fontWeight="bold" color="white">
            Your Name
          </Box>
          <VStack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            w={"full"}
            alignItems={"right"}
          >
            <InputGroup size={"lg"}>
              <InputLeftAddon
                children="Email"
                width={"120px"}
                rounded={"2xl"}
                borderRightStyle="dashed"
                borderRightColor={"black"}
                borderRightWidth="3px"
              />

              <Input
                type={"text"}
                size={"lg"}
                placeholder={"john@doe.net"}
                color={"white"}
                bg={"white"}
                rounded={"2xl"}
                border={0}
              />
            </InputGroup>
            <Button
            bg={"white"}
            rounded={"2xl"}
            color={"black"}
            size={"lg"}
            mt={50}
            flex={"1 0 auto"}
          >
            Create Account
          </Button>
          </VStack>

         
        </VStack>
      </VStack>
    </Box>
  );
}
