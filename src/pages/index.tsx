import {
  Link as ChakraLink,
  Image,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Button,
  GridItem,
  Input,
  SimpleGrid,
  VisuallyHidden,
  Badge,
  Box,
  chakra,
  Flex,
  InputGroup,
  InputLeftAddon,
  Heading,
  Center,
  Icon,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import Header from "../components/Header";
import { title } from "process";
import BackgroundImage from "../components/BackgroundImage";
const Index = () => (
  // add black layer screen over an image in background in chakra ui
  <Box
    bgImage="bgbg.jpg"
    height="100vh"
    _before={{
      bgImage: "bgbg.jpg",
      bgSize: "cover",
      bgPosition: "center",
      bgRepeat: "no-repeat",
      position: "relative",
      height: "100vh",
    }}
  >
    <Header />
    <Center mt="30vh" mb={"5vh"}>
      <Heading textColor={"White"} fontSize="6vw">
        Start your journey for free
      </Heading>
    </Center>

    <Center>
      <Button
        bg={"white"}
        rounded={"2xl"}
        color={"black"}
        size={"lg"}
        width={"120px"}
      >
        Start
      </Button>
    </Center>
    {/* <Stack spacing={4} direction={{ base: "column", md: "row" }} w={"full"}>
        <InputGroup size={"lg"}>
          <InputLeftAddon children="Email" width={'120px'} rounded={"2xl"} borderRightStyle='dashed' borderRightColor={'black'} borderRightWidth='3px' />

          <Input
            type={"text"}
            size={"lg"}
            placeholder={"superplay@game.com"}
            color={"white"}
            bg={"white"}
            width={"2xl"}
            rounded={"2xl"}
            border={0}
            _focus={{
              bg: useColorModeValue("gray.200", "gray.800"),
              outline: "none",
            }}
          />
        </InputGroup>

        
      </Stack> */}
    <HStack width={"10vw"}>
      <Image src="safe.png" />
      <Image src="polygon-matic-logo.png" />
      <Image src="superfluid.svg" />
    </HStack>
  </Box>
);

export default Index;
