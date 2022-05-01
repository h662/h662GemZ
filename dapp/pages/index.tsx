import {
  Button,
  Flex,
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
        bg="red.100"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <TableContainer mb={4}>
          <Table>
            <Thead>
              <Tr>
                <Th>Rank\Type</Th>
                <Th>1</Th>
                <Th>2</Th>
                <Th>3</Th>
                <Th>4</Th>
              </Tr>
            </Thead>
            {gemTokenCount?.map((v, i) => {
              return (
                <Tbody key={i}>
                  <Tr>
                    <Td>{i + 1}</Td>
                    {v.map((w, j) => {
                      return <Td key={j}>{w}</Td>;
                    })}
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        </TableContainer>
        <Text mb={4}>Remaining GemZ : {remainGemTokens}</Text>
        <Button colorScheme="pink" onClick={onOpen}>
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
