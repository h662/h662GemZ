// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintGemToken is ERC721Enumerable, Ownable {
    string public metadataURI;

    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
    }

    struct GemTokenData {
        uint gemTokenRank;
        uint gemTokenType;
    }

    mapping(uint => GemTokenData) public gemTokenData;

    function tokenURI(uint _tokenId) override public view returns(string memory) {
        string memory gemTokenRank = Strings.toString(gemTokenData[_tokenId].gemTokenRank);
        string memory gemTokenType = Strings.toString(gemTokenData[_tokenId].gemTokenType);

        return string(abi.encodePacked(metadataURI, '/', gemTokenRank, '/', gemTokenType, '.json'));
    }

    function mintGemToken() public  {
        uint tokenId = totalSupply() + 1;

        gemTokenData[tokenId] = GemTokenData(1, 1);

        _mint(msg.sender, tokenId);
    }

   
}