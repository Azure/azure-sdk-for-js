// ------------------------------------
// Copyright(c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------
import { KeyVaultSecrets } from "./KeyVault";
import { EventHubs } from "./EventHub";
import { BlobStorage } from "./BlobStorage";
import { CosmosDB } from "./CosmosDB";

function dedent(str: ReadonlyArray<string>) {
  return str[0].replace(/^\ */gm, "");
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
  try {
    await KeyVaultSecrets.Run();
    await BlobStorage.Run();
    await EventHubs.Run();
    // Temporarily disabling cosmos db testing
    // await CosmosDB.Run();
  } catch (ex) {
    console.error(ex);
    console.error("UNEXPECTED ERROR");
    process.exit(1);
  }
}

main();
