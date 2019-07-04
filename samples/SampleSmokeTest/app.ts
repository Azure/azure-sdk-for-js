import {KeyVaultSecrets} from "./KeyVaultTest";
import {SampleInterface} from "./SampleInterface";
import {EventHubs} from "./EventHubsTest";

function welcomeMessage(){
    console.log("=============================================");
    console.log("Smoke Test Samples for SDK Track 2 libraries");
    console.log("=============================================");
    console.log();
}

async function runEachSample(sample:SampleInterface){
    console.log("------------------------");
    console.log(sample.service);
    console.log("------------------------");
    console.log(sample.description);

    await sample.Run();

    console.log();
}

///This function is going to call each sample to run it.
async function main(){
    welcomeMessage();

    var keyVault = new KeyVaultSecrets();
    await runEachSample(keyVault);

    var eventHub = new EventHubs();
    await runEachSample(eventHub);

    //The idea here is to have a vector or array of samples, and do a for each sample in sample...
    //Right now is gonna be hardcoded?
}

main();