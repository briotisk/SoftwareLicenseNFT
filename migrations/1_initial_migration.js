const SoftwareLicense = artifacts.require("SoftwareLicense");

module.exports = function(deployer) {
  deployer.deploy(SoftwareLicense, 2, "LICENSE");
};
