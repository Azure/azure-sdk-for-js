// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates with an app registration’s client Id and secret.
 */

const { ClientSecretCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID, // The tenant ID in Azure Active Directory
    process.env.AZURE_CLIENT_ID, // The app registration client Id in the AAD tenant
    process.env.AZURE_CLIENT_SECRET // The app registration secret for the registered application
  );

  const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
  const client = new KeyClient(keyVaultUrl, credential);

  // Retrieving the properties of the existing keys in that specific Key Vault.
  console.log(await client.listPropertiesOfKeys().next());
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
