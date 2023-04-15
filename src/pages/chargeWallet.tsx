import { SafeOnRampKit, StripeAdapter } from "@safe-global/onramp-kit";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { web3AuthService } from "../services/web3Auth";
import { OpenloginUserInfo } from "@toruslabs/openlogin";

export default function Page1Test() {
  const [address, setAddress] = useState<string>("");
  const router = useRouter();

  const [info, setInfo] = useState<Partial<OpenloginUserInfo>>({});

  useEffect(() => {
    async function loadInfo() {
      const info = await web3AuthService.getInfo();
      setInfo(info);
      const signer = web3AuthService.getProvider();
      setAddress(await signer.getSigner().getAddress());
    }
    loadInfo();
  }, []);

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  const fundWallet = async function () {
    const safeOnRamp = await SafeOnRampKit.init(
      new StripeAdapter({
        // Get public key from Stripe: https://dashboard.stripe.com/register
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        // Deploy your own server: https://github.com/safe-global/safe-core-sdk/tree/main/packages/onramp-kit/example/server
        onRampBackendUrl: "https://aa-stripe.safe.global",
      })
    );

    // See options for using the StripeAdapter open method in:
    // https://stripe.com/docs/crypto/using-the-api
    await safeOnRamp.open({
      element: "#stripe-root",
      theme: "light",
      defaultOptions: {
        customer_wallet_address: address,
        transaction_details: {
          destination_network: "ethereum",
          destination_currency: "usdc",
        },
      },
    });
  };

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
                  color={"black"}
                  bg={"white"}
                  rounded={"2xl"}
                  border={0}
                  value={address}
                />
              </InputGroup>
              <Button
                bg={"white"}
                rounded={"2xl"}
                color={"black"}
                size={"lg"}
                mt={50}
                flex={"1 0 auto"}
                onClick={fundWallet}
              >
                Charge
              </Button>
            </VStack>
          </Center>
        </Flex>
        <HStack ml={50} p={10}>
          <Center id="stripe-root" width={"80%"} m={"0 auto"}></Center>
        </HStack>
      </SimpleGrid>
    </>
  );
}
