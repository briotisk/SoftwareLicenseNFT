const SoftwareLicense = artifacts.require("SoftwareLicense");
const { ethers } = require("ethers");

//deploy de testes
/*module.exports = function(deployer) {
  deployer.deploy(SoftwareLicense, 0, "");
};
*/

//deploy na testenet goerli
let inputReader = require('readline-sync');
let licensePrice = inputReader.question("Digite o preço da licença em ETH: ");
let licenseSeed = inputReader.question("Digite a string que servirá de seed para a licença: ");

module.exports = function(deployer, network) {
  deployer.deploy(SoftwareLicense, ethers.parseEther(licensePrice, 18), licenseSeed);
}