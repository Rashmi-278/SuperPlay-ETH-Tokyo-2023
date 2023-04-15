import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Progress,
  Button,
  ButtonGroup,
  IconButton,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { BsStar, BsStarFill, BsStarHalf, BsWallet2 } from "react-icons/bs";

function ProfileCard(data: {
  isNew: boolean;
  imageURL: string;
  name: string;
  showCharge: boolean;
}) {
  return (
    <Flex p={10} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
          objectFit={"cover"}
          width={"100%"}
          minWidth={382}
        />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              color={useColorModeValue("gray.800", "white")}
              w={"100%"}
            >
              <Box
                as="p"
                color={"gray.600"}
                fontSize="xs"
                display={"flex"}
                justifyContent={"space-between"}
              >
                <span>1400 $SP</span>
                <span>100 $SP/week</span>
              </Box>
              <Progress value={20} size="xs" colorScheme="pink" />

              {data.showCharge ? (
                <ButtonGroup size="sm" isAttached variant="outline">
                  <NextLink href="/chargeWallet" legacyBehavior passHref>
                    <Link>
                      <Button>Charge $SP</Button>
                    </Link>
                  </NextLink>
                </ButtonGroup>
              ) : null}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProfileCard;
