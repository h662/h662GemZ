// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "MintGemToken.sol";

contract SaleGemToken {
    MintGemToken public mintGemToken;

    constructor(address _mintGemToken) {
        mintGemToken = MintGemToken(_mintGemToken);
    }

    mapping(uint => uint) public tokenPrices;

    uint[] public onSaleTokens;

    function setForSaleGemToken(uint _tokenId, uint _price) public {
        address tokenOwner = mintGemToken.ownerOf(_tokenId);

        require(tokenOwner == msg.sender, "Caller is not Gem token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(tokenPrices[_tokenId] == 0, "This Gem token is already on sale.");
        require(mintGemToken.isApprovedForAll(msg.sender, address(this)), "Gem token onwer did not approve token.");

        tokenPrices[_tokenId] = _price;

        onSaleTokens.push(_tokenId);
    }
}