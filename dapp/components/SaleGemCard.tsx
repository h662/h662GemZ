import { Box } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useMetadata } from "../hooks";
import GemCard from "./GemCard";
import { MyGemCardProps } from "./MyGemCard";

interface SaleGemCardProps extends MyGemCardProps {}

const SaleGemCard: FC<SaleGemCardProps> = ({ gemTokenData }) => {
  const { metadataURI, getMetadata } = useMetadata();

  useEffect(() => {
    getMetadata(gemTokenData.gemTokenRank, gemTokenData.gemTokenType);
  }, []);

  return <GemCard metadataURI={metadataURI} />;
};

export default SaleGemCard;
