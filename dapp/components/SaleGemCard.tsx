import { Box, Button, Text } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { SALE_GEM_TOKEN_ADDRESS } from "../caverConfig";
import { useAccount, useCaver, useMetadata } from "../hooks";
import { GemTokenData } from "../interfaces";
import GemCard from "./GemCard";
import { MyGemCardProps } from "./MyGemCard";

interface SaleGemCardProps extends MyGemCardProps {
  getSaleGemTokens: () => Promise<void>;
  setSaleGemTokens: Dispatch<SetStateAction<GemTokenData[] | undefined>>;
}

const SaleGemCard: FC<SaleGemCardProps> = ({
  gemTokenData,
  getSaleGemTokens,
  setSaleGemTokens,
}) => {
  const { account } = useAccount();
  const { caver, saleGemTokenContract } = useCaver();
  const { metadataURI, getMetadata } = useMetadata();

  const onClickBuy = async () => {
    try {
      if (!account || !caver || !saleGemTokenContract) return;

      const response = await caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: account,
        to: SALE_GEM_TOKEN_ADDRESS,
        gas: "3000000",
        data: saleGemTokenContract.methods
          .purchaseGemToken(gemTokenData.tokenId)
          .encodeABI(),
        value: gemTokenData.tokenPrice,
      });

      if (response.status) {
        setSaleGemTokens(undefined);
        getSaleGemTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata(gemTokenData.gemTokenRank, gemTokenData.gemTokenType);
  }, []);

  return (
    <Box>
      <GemCard metadataURI={metadataURI} />
      <Text>
        {caver?.utils.convertFromPeb(gemTokenData.tokenPrice, "KLAY")} KLAY
      </Text>
      <Button size="sm" mt={2} onClick={onClickBuy}>
        Buy
      </Button>
    </Box>
  );
};

export default SaleGemCard;
