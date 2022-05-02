import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

import { useAccount } from "../hooks";

const Header: FC = () => {
  const { account } = useAccount();

  return (
    <Flex
      position="fixed"
      bg="blue.300"
      w="full"
      justifyContent="space-between"
      alignItems="center"
      px={12}
      py={2}
    >
      <Flex
        bg="white"
        alignItems="center"
        px={2}
        py={1}
        rounded="full"
        fontWeight="bold"
      >
        💎h662GemZ💎
      </Flex>
      <Box>
        <Link href="/">
          <Button size="sm" variant="ghost">
            Home
          </Button>
        </Link>
        <Link href="my-gemz">
          <Button size="sm" variant="ghost">
            My GemZ
          </Button>
        </Link>
        <Link href="sale">
          <Button size="sm" variant="ghost">
            Sale
          </Button>
        </Link>
      </Box>
      <Box>
        <Text fontSize="xs">
          {account
            ? `Account ${account.substr(0, 4)}...${account.substr(
                account.length - 4,
                account.length
              )}`
            : "Install Kaikas Wallet"}
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
