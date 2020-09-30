// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// purgeAllSecrets.js
// helps remove any existing resources from the KeyVault.

const { SecretClient } = require("@azure/keyvault-secrets");
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
  const client = new SecretClient(url, credential);

  let listPropertiesOfSecrets = client.listPropertiesOfSecrets();
  while (true) {
    let { done, value } = await listPropertiesOfSecrets.next();
    if (done) {
      break;
    }

    try {
      const poller = await client.beginDeleteSecret(value.name);
      await poller.pollUntilDone();
    } catch(e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
}

  let listDeletedSecrets = client.listDeletedSecrets();
  while (true) {
    let { done, value } = await listDeletedSecrets.next();
    if (done) {
      break;
    }

    try {
      // This will take a while.
      await client.purgeDeletedSecret(deletedSecret.name);
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
