import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { web3AuthService } from "../services/web3Auth";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();
  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bgColor={"#000000"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text color={"white"} as={"span"}>
              Start your journey for free
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Onboard on billion users onto your hacker. Simplifing onboarding for
            Web3 Games.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              bg={"white"}
              color={"black"}
              onClick={() => {
                web3AuthService.connect("5").then(() => {
                  router.push("/createAccount");
                });
              }}
            >
              Start
            </Button>
            <Button bg={"gray.500"} rounded={"full"}>
              How It Works
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Landing Image"} objectFit={"cover"} src={"bgbg.jpg"} />
      </Flex>
    </Stack>
  );
}
