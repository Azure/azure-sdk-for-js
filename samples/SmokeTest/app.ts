import { KeyVaultSecrets } from "./KeyVaultTest";
import { EventHubs } from "./EventHubsTest";
import { BlobStorage } from "./BlobStorage";
import { CosmosDB } from "./CosmosDB";

function dedent(str:ReadonlyArray<string>){
  return str[0].replace(/^\ */gm,'');
}

function welcomeMessage() {
  console.log(dedent`
    =============================================
    Smoke Test Samples for SDK Track 2 libraries
    =============================================
    `);
}

async function main() {
  welcomeMessage();

  await KeyVaultSecrets.Run();
  await BlobStorage.Run();
  await EventHubs.Run();
  await CosmosDB.Run();
}

main();
