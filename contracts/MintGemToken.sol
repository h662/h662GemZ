// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintGemToken is ERC721Enumerable, Ownable {
    uint constant public MAX_TOKEN_COUNT = 1000;
    uint constant public TOKEN_RANK_LENGTH = 4;
    uint constant public TOKEN_TYPE_LENGTH = 4;

    string public metadataURI;

    // 10^18 Peb = 1 Klay
    uint public gemTokenPrice = 1000000000000000000;

    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
    }

    struct GemTokenData {
        uint gemTokenRank;
        uint gemTokenType;
    }

    mapping(uint => GemTokenData) public gemTokenData;

    uint[TOKEN_RANK_LENGTH][TOKEN_TYPE_LENGTH] public gemTokenCount; 

    function tokenURI(uint _tokenId) override public view returns(string memory) {
        string memory gemTokenRank = Strings.toString(gemTokenData[_tokenId].gemTokenRank);
        string memory gemTokenType = Strings.toString(gemTokenData[_tokenId].gemTokenType);

        return string(abi.encodePacked(metadataURI, '/', gemTokenRank, '/', gemTokenType, '.json'));
    }

    function mintGemToken() public payable {
        require(gemTokenPrice <= msg.value, "Not enough Klay.");
        require(MAX_TOKEN_COUNT > totalSupply(), "No more minting is possible.");

        uint tokenId = totalSupply() + 1;

        GemTokenData memory randomTokenData = randomGenerator(msg.sender, tokenId);

        gemTokenData[tokenId] = GemTokenData(randomTokenData.gemTokenRank, randomTokenData.gemTokenType);

        gemTokenCount[randomTokenData.gemTokenRank - 1][randomTokenData.gemTokenType - 1] += 1;

        payable(owner()).transfer(msg.value);

        _mint(msg.sender, tokenId);
    }

    function getGemTokenCount() public view returns(uint[TOKEN_RANK_LENGTH][TOKEN_TYPE_LENGTH] memory) {
        return gemTokenCount;
    }
    function getGemTokenRank(uint _tokenId) public view returns(uint) {
        return gemTokenData[_tokenId].gemTokenRank;
    }
    function getGemTokenType(uint _tokenId) public view returns(uint) {
        return gemTokenData[_tokenId].gemTokenType;
    }

    function randomGenerator(address _msgSender, uint _tokenId) private view returns(GemTokenData memory) {
        uint randomNum = uint(keccak256(abi.encodePacked(blockhash(block.timestamp), _msgSender, _tokenId))) % 100;

        GemTokenData memory randomTokenData;

         if (randomNum < 5) {
            if (randomNum == 1) {
                randomTokenData.gemTokenRank = 4;
                randomTokenData.gemTokenType = 1;
            } else if (randomNum == 2) {
                randomTokenData.gemTokenRank = 4;
                randomTokenData.gemTokenType = 2;
            } else if (randomNum == 3) {
                randomTokenData.gemTokenRank = 4;
                randomTokenData.gemTokenType = 3;
            } else {
                randomTokenData.gemTokenRank = 4;
                randomTokenData.gemTokenType = 4;
            }
        } else if (randomNum < 13) {
            if (randomNum < 7) {
                randomTokenData.gemTokenRank = 3;
                randomTokenData.gemTokenType = 1;
            } else if (randomNum < 9) {
                randomTokenData.gemTokenRank = 3;
                randomTokenData.gemTokenType = 2;
            } else if (randomNum < 11) {
                randomTokenData.gemTokenRank = 3;
                randomTokenData.gemTokenType = 3;
            } else {
                randomTokenData.gemTokenRank = 3;
                randomTokenData.gemTokenType = 4;
            }
        } else if (randomNum < 37) {
            if (randomNum < 19) {
                randomTokenData.gemTokenRank = 2;
                randomTokenData.gemTokenType = 1;
            } else if (randomNum < 25) {
                randomTokenData.gemTokenRank = 2;
                randomTokenData.gemTokenType = 2;
            } else if (randomNum < 31) {
                randomTokenData.gemTokenRank = 2;
                randomTokenData.gemTokenType = 3;
            } else {
                randomTokenData.gemTokenRank = 2;
                randomTokenData.gemTokenType = 4;
            }
        } else {
            if (randomNum < 52) {
                randomTokenData.gemTokenRank = 1;
                randomTokenData.gemTokenType = 1;
            } else if (randomNum < 68) {
                randomTokenData.gemTokenRank = 1;
                randomTokenData.gemTokenType = 2;
            } else if (randomNum < 84) {
                randomTokenData.gemTokenRank = 1;
                randomTokenData.gemTokenType = 3;
            } else {
                randomTokenData.gemTokenRank = 1;
                randomTokenData.gemTokenType = 4;
            }
        }

        return randomTokenData;
    }
}