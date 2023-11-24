const SoftwareLicense = artifacts.require("SoftwareLicense");

module.exports = function(deployer) {
  deployer.deploy(SoftwareLicense, 20, "LICENSE");
};
