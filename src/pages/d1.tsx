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
const Index = () => (
<Container height="100vh"  bgColor={'blackAlpha.800'} >
    <Header />
    <Center mt="30vh" mb={'5vh'}>
      <Heading textColor={"White"} fontSize="6vw">
        Start your journey for free
      </Heading>
    </Center>

    <Flex>
      <Center>
      <Button
          bg={"white"}
          rounded={"2xl"}
          color={"black"}
          size={"lg"}
          width={'120px'}
          flex={"1 0 auto"}
    
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
    
    </Flex>
    <HStack width={'10vw'}>
        <Image src="safe.png" />
        <Image src="polygon-matic-logo.png" />
        <Image src="superfluid.svg" />
    </HStack>

   
  </Container>
);

export default Index;
