import { Box, Grid } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import MyGemCard from "../components/MyGemCard";
import { useAccount, useCaver } from "../hooks";
import { GemTokenData } from "../interfaces";

const MyGemz: FC = () => {
  const [myGemTokens, setMyGemTokens] = useState<GemTokenData[] | undefined>(
    undefined
  );

  const { account } = useAccount();
  const { saleGemTokenContract } = useCaver();

  const getGemTokens = async () => {
    try {
      if (!account || !saleGemTokenContract) return;

      const response = await saleGemTokenContract.methods
        .getGemTokens(account)
        .call();

      setMyGemTokens(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGemTokens();
  }, [account, saleGemTokenContract]);

  return (
    <Box bg="blue.100" p={12} minH="100vh">
      <Grid templateColumns="repeat(4, 1fr)" py={4}>
        {myGemTokens?.map((v, i) => {
          return <MyGemCard key={i} gemTokenData={v} />;
        })}
      </Grid>
    </Box>
  );
};

export default MyGemz;
