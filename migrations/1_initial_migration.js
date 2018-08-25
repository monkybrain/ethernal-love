var Migrations = artifacts.require("./Migrations.sol");
var Ethernal = artifacts.require("./Ethernal.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Ethernal);
};
