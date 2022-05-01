import { FC, useEffect } from "react";
import { useMetadata } from "../hooks";
import { GemTokenData } from "../interfaces";
import GemCard from "./GemCard";

interface MyGemCardProps {
  gemTokenData: GemTokenData;
}

const MyGemCard: FC<MyGemCardProps> = ({ gemTokenData }) => {
  const { metadataURI, getMetadata } = useMetadata();

  useEffect(() => {
    getMetadata(gemTokenData.gemTokenRank, gemTokenData.gemTokenType);
  }, []);

  return <GemCard metadataURI={metadataURI} />;
};

export default MyGemCard;
