const SoftwareLicense = artifacts.require("SoftwareLicense");

module.exports = function(deployer) {
  deployer.deploy(SoftwareLicense, 20, "LICENSE");
};

module.exports = function(deployer, network) {
  
  //deploy na rede de testes 
  if (network == "development") {

    deployer.deploy(SoftwareLicense, 20, "LICENSE");
  //deploy na testnet pública
  } else {

    let inputReader = require('readline-sync');
    let licensePriceString = inputReader.question("Digite o preço da licença em gwei: ");
    let licenseSeed = inputReader.question("Digite a string que servirá de seed para a licença: ");

    let BN = web3.utils.BN;
    const licensePrice = new BN(licensePriceString);

    deployer.deploy(SoftwareLicense, licensePrice, licenseSeed);

  }

}