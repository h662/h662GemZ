import { Box, Grid } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import SaleGemCard from "../components/SaleGemCard";
import { useCaver } from "../hooks";
import { GemTokenData } from "../interfaces";

const Sale: NextPage = () => {
  const [saleGemTokens, setSaleGemTokens] = useState<
    GemTokenData[] | undefined
  >(undefined);

  const { saleGemTokenContract } = useCaver();

  const getSaleGemTokens = async () => {
    try {
      if (!saleGemTokenContract) return;

      const response = await saleGemTokenContract.methods
        .getSaleGemTokens()
        .call();

      setSaleGemTokens(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaleGemTokens();
  }, [saleGemTokenContract]);

  return (
    <Grid
      px={12}
      py={16}
      minH="100vh"
      templateColumns="repeat(4, 1fr)"
      maxW="container.lg"
      mx="auto"
      justifyItems="center"
    >
      {saleGemTokens?.map((v, i) => {
        return (
          <SaleGemCard
            key={i}
            gemTokenData={v}
            getSaleGemTokens={getSaleGemTokens}
            setSaleGemTokens={setSaleGemTokens}
          />
        );
      })}
    </Grid>
  );
};

export default Sale;
