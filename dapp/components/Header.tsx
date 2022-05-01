import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

import { useAccount } from "../hooks";

const Header: FC = () => {
  const { account } = useAccount();

  return (
    <Flex
      position="fixed"
      bg="white"
      w="full"
      justifyContent="space-between"
      px={12}
      py={2}
    >
      <Box>h662GemZ</Box>
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
      </Box>
      <Box>
        <Text>
          {account
            ? `${account.substr(0, 4)}...${account.substr(
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
