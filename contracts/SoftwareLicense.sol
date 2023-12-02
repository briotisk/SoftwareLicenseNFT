// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SoftwareLicense {

    address public owner;
    uint256 public licensePrice;
    bytes32 private hash;
    string private licenseSeed;
    mapping(address => bool) public hasLicense;

    event LicensePurchased(address indexed buyer, uint256 timestamp);

    modifier hasNotPurchasedLicense() {
        require(!hasLicense[msg.sender], "You already have a license");
        _;
    }

    modifier hasPurchasedLicense () {
        require(hasLicense[msg.sender], "You need to purchase a license first");
        _;
    }

    constructor(uint256 _licensePrice, string memory _licenseSeed) {
        owner = msg.sender;
        licensePrice = _licensePrice;
        licenseSeed = _licenseSeed;
        hash = sha256(abi.encodePacked(licenseSeed));
    }

    function purchaseLicense() external payable hasNotPurchasedLicense {
        require(msg.value == licensePrice, "Incorrect amount sent");

        // Transfer funds to the owner
        payable(owner).transfer(msg.value);

        // Grant license to the buyer
        hasLicense[msg.sender] = true;

        // Emit an event
        emit LicensePurchased(msg.sender, block.timestamp);
    }

    function printSoftwareKey() external view hasPurchasedLicense returns (bytes32) {
        // Esta função pode ser chamada apenas por usuários que compraram uma licença
        // Retorna a chave de software gerada por meio de criptografia no construtor
        return hash;
    }
}
