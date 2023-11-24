const SoftwareLicense = artifacts.require("SoftwareLicense");
var inputReader = require('readline-sync');
 
let licensePriceString = inputReader.question("Digite o preço da licença em gwei: ");
let licenseSeed = inputReader.question("Digite a string que servirá de seed para a licença: ");

let BN = web3.utils.BN;
const licensePrice = new BN(licensePriceString);

module.exports = function(deployer) {
  deployer.deploy(SoftwareLicense, licensePrice, licenseSeed);
};
