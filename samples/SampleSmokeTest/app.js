"use strict";
exports.__esModule = true;
var KeyVaultTest_1 = require("./KeyVaultTest");
function welcomeMessage() {
    console.log("=============================================");
    console.log("Smoke Test Samples for SDK Track 2 libraries");
    console.log("=============================================");
    console.log();
}
function runEachSample(sample) {
    console.log("------------------------");
    console.log(sample.service);
    console.log("------------------------");
    console.log(sample.description);
    sample.Run();
    console.log();
}
///This function is going to call each sample to run it.
function main() {
    welcomeMessage();
    var keyVault = new KeyVaultTest_1.KeyVaultSecrets();
    runEachSample(keyVault);
    //The idea here is to have a vector or array of samples, and do a for each sample in sample...
    //Right now is gonna be hardcoded?
}
main();
