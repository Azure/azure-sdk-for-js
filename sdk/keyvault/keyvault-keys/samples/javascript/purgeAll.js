// Copyright (c) Microsoft corporation.
// Licensed under the MIT license.

const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new KeyClient(url, credential);

  let listPropertiesOfKeys = client.listPropertiesOfKeys();
  while (true) {
    let { done, value } = await listPropertiesOfKeys.next();
    if (done) {
      break;
    }

    const poller = await client.beginDeleteKey(properties.name);
    await poller.pollUntilDone();
  }

  let listDeletedKeys = client.listPropertiesOfKeys();
  while (true) {
    let { done, value } = await listDeletedKeys.next();
    if (done) {
      break;
    }

    // This will take a while.
    await client.purgeDeletedKey(deletedKey.name);
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
