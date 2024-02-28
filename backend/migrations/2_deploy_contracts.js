const ProfileManager = artifacts.require("ProfileManager");
const TopWeb3ProfessionalNFT = artifacts.require("TopWeb3ProfessionalNFT");

module.exports = function (deployer) {
    deployer.deploy(TopWeb3ProfessionalNFT).then(() => {
        return deployer.deploy(ProfileManager);
    });
};
