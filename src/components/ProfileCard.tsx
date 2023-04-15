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
import { BsStar, BsStarFill, BsStarHalf, BsWallet2 } from "react-icons/bs";

const data = {
  isNew: true,
  imageURL: "top_image.png", // profile picture
  name: "User Name",
};

function ProfileCard() {
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
        />

        <Box p="6">
          <Box alignItems="baseline">
            {
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                Trail
              </Badge>
            }
          </Box>
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

            <ButtonGroup size="sm" isAttached variant="outline">
              <Link href="/chargeWallet">
                <Button>Add Wallet</Button>
                <IconButton
                  aria-label="Add Wallet"
                  icon={<AddIcon />}
                  disabled
                />
              </Link>
            </ButtonGroup>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="sm">
                14 Days Remaining
              </Box>
              <Progress value={20} size="xs" colorScheme="pink" />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProfileCard;
