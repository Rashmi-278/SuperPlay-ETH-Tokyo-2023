import { OpenloginUserInfo } from "@toruslabs/openlogin";
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
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import { web3AuthService } from "../services/web3Auth";

export default function Page1Test() {
  const [info, setInfo] = useState<Partial<OpenloginUserInfo>>({});

  useEffect(() => {
    async function loadInfo() {
      const info = await web3AuthService.getInfo();
      setInfo(info);
    }
    loadInfo();
  }, []);

  return (
    <Box height="100vh">
      <Header />
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        spacing={0}
        background={"#000000"}
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
            lg: 10,
          }}
          py={8}
        >
          <Center>
            <ProfileCard
              isNew={true}
              imageURL={info.profileImage}
              name={info.name}
              showCharge={true}
            />
          </Center>
        </Flex>
        <HStack ml={200}>
          <Center w={300}>
            <VStack
              spacing={4}
              direction={{ base: "column", md: "row" }}
              w={"100%"}
              alignItems={"right"}
            >
              <Box as="h1" fontSize="6xl" fontWeight="bold" color="white">
                {info.name}
              </Box>
              <Button size={"lg"}>Tutorial</Button>
              <Button size={"lg"}>Buy Gaming Items</Button>
              <Button size={"lg"}>Battle To Other Users</Button>
              <Button size={"lg"}>Feedback</Button>
            </VStack>
          </Center>
        </HStack>
      </SimpleGrid>
    </Box>
  );
}
