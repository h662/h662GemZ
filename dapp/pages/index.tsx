import {
  Box,
  Button,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import MintingModal from "../components/MintingModal";
import { useCaver } from "../hooks";

const Home: NextPage = () => {
  const [remainGemTokens, setRemainGemTokens] = useState<number>(0);
  const [gemTokenCount, setGemTokenCount] = useState<string[][] | undefined>(
    undefined
  );

  const { mintGemTokenContract } = useCaver();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRemainGemTokens = async () => {
    try {
      if (!mintGemTokenContract) return;

      const response = await mintGemTokenContract.methods.totalSupply().call();

      setRemainGemTokens(1000 - parseInt(response, 10));
    } catch (error) {
      console.error(error);
    }
  };
  const getGemTokenCount = async () => {
    try {
      if (!mintGemTokenContract) return;

      const response = await mintGemTokenContract.methods
        .getGemTokenCount()
        .call();

      setGemTokenCount(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRemainGemTokens();
    getGemTokenCount();
  }, [mintGemTokenContract]);

  return (
    <>
      <Flex
        pt={20}
        minH="100vh"
        alignItems="center"
        direction="column"
        textColor="gray.700"
      >
        <Text fontSize="4xl">💎Collect 16 kinds of GemZ💎</Text>
        <Text mb={8} fontSize="2xl" color="blue.400">
          Remaining GemZ : {remainGemTokens}
        </Text>
        <TableContainer mb={8}>
          <Table>
            <Thead bgColor="gray.500">
              <Tr>
                <Th textColor="gray.700">Rank\Type</Th>
                <Th>
                  <Image w={6} borderRadius="sm" src="images/t1.png" alt="1" />
                </Th>
                <Th>
                  <Image w={6} borderRadius="sm" src="images/t2.png" alt="2" />
                </Th>
                <Th>
                  <Image w={6} borderRadius="sm" src="images/t3.png" alt="3" />
                </Th>
                <Th>
                  <Image w={6} borderRadius="sm" src="images/t4.png" alt="4" />
                </Th>
              </Tr>
            </Thead>
            {gemTokenCount?.map((v, i) => {
              return (
                <Tbody key={i} bgColor={`gray.${400 - i * 100}`}>
                  <Tr>
                    <Td textAlign="center" fontSize="xs" fontWeight="bold">
                      Rank {i + 1}
                    </Td>
                    {v.map((w, j) => {
                      return (
                        <Td key={j} textAlign="center">
                          {w}
                        </Td>
                      );
                    })}
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        </TableContainer>

        <Button colorScheme="blue" onClick={onOpen}>
          Minting
        </Button>
      </Flex>
      <MintingModal
        isOpen={isOpen}
        onClose={onClose}
        getRemainGemTokens={getRemainGemTokens}
        getGemTokenCount={getGemTokenCount}
      />
    </>
  );
};

export default Home;
