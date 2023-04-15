import {
  SimpleGrid,
  Box,
  Flex,
  Badge,
  chakra,
  VisuallyHidden,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  VStack,
  Avatar,
  AvatarBadge,
  Center,
  HStack,
  Container,
} from "@chakra-ui/react";
import Header from "../components/Header";

export default function Page1Test() {
  return (
    <>
      <Header />
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        spacing={0}
        background={"black"}
        _after={{
          bg: "black",
          opacity: 0.25,
          pos: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
          content: '" "',
        }}
      >
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          ml={100}
          px={{
            base: 4,
            lg: 20,
          }}
          py={24}
        >
          <Center>
            <Avatar src="top_image.png" width={"500px"} height={"500px"} />
          </Center>
        </Flex>
        <HStack ml={200}>
          <Center>
            <VStack
              spacing={4}
              direction={{ base: "column", md: "row" }}
              w={"full"}
              alignItems={"right"}
            >
              <Box as="h1" fontSize="6xl" fontWeight="bold" color="white">
                Your Name
              </Box>
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
          </Center>
        </HStack>
      </SimpleGrid>
    </>
  );
}
