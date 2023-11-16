// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FireMen is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    mapping(string => uint8) existingURIS;

    constructor(
        address initialOwner
    ) ERC721("FireMen", "FEM") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIS[uri] == 1;
    }

    function payToMint(
        address recipent,
        string memory uri
    ) public payable returns (uint256) {
        require(msg.value >= 0.05 ether, "Not enough ETH sent; check price!");
        require(existingURIS[uri] != 1, "Content already owned!");

        uint256 tokenId = _nextTokenId++;
        _safeMint(recipent, tokenId);
        _setTokenURI(tokenId, uri);

        existingURIS[uri] = 1;

        return tokenId;
    }

    function count() public view returns (uint256) {
        return _nextTokenId;
    }
}
