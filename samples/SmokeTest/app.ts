import {KeyVaultSecrets} from "./KeyVaultTest";
import {EventHubs} from "./EventHubsTest";
import {BlobStorage} from "./BlobStorage";
import {CosmosDB} from "./CosmosDB";

function welcomeMessage(){
    console.log("=============================================");
    console.log("Smoke Test Samples for SDK Track 2 libraries");
    console.log("=============================================");
    console.log();
}

async function runEachSample(sample){
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

    let keyVault = new KeyVaultSecrets();
    await runEachSample(keyVault);

    let eventHub = new EventHubs();
    await runEachSample(eventHub);

    let blobStorage = new BlobStorage();
    await runEachSample(blobStorage);

    let cosmosDB = new CosmosDB();
    await runEachSample(cosmosDB);    
}

main();