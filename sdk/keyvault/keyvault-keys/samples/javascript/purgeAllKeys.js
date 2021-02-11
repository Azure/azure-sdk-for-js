// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// purgeAllKeys.js
// helps remove any existing keys from the KeyVault.

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
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new KeyClient(url, credential);

  let listPropertiesOfKeys = client.listPropertiesOfKeys();
  while (true) {
    let { done, value } = await listPropertiesOfKeys.next();
    if (done) {
      break;
    }

    try {
      const poller = await client.beginDeleteKey(value.name);
      await poller.pollUntilDone();
    } catch(e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
}

  let listDeletedKeys = client.listPropertiesOfKeys();
  while (true) {
    let { done, value } = await listDeletedKeys.next();
    if (done) {
      break;
    }

    try {
      // This will take a while.
      await client.purgeDeletedKey(deletedKey.name);
    } catch(e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
