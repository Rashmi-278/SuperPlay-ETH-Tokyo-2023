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
import ProfileCard from "../components/ProfileCardPro";

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
          px={{
            base: 4,
            lg: 20,
          }}
          py={8}
        >
          <Center>
            <ProfileCard/>
          </Center>
        </Flex>
        <HStack ml={50}>
          <Center>
            <VStack
              spacing={4}
              direction={{ base: "column", md: "row" }}
              w={"full"}
              alignItems={"right"}
            >
              <Box as="h1" fontSize="6xl" fontWeight="bold" color="white">
                Become a pro gamer
              </Box>
              <InputGroup size={"lg"}>
                <InputLeftAddon
                  children="Wallet Address"
                  width={"180px"}
                  rounded={"2xl"}
                  borderRightStyle="dashed"
                  borderRightColor={"black"}
                  borderRightWidth="3px"
                />

                <Input
                  type={"text"}
                  size={"lg"}
                  placeholder={"0xsuperlongaddress"}
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
                Charge
              </Button>
            </VStack>
          </Center>
        </HStack>
      </SimpleGrid>
    </>
  );
}
