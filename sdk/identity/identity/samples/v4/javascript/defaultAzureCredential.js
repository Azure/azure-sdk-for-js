// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Tries several authentication methods using a single credential, which is the simplest way to use `@azure/identity`.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");

// Load the .env file if it exists
require("dotenv/config");

/**
 * The `DefaultAzureCredential` is appropriate for most scenarios where the application is intended to ultimately be run in the Azure Cloud.
 * This is because the `DefaultAzureCredential` combines credentials commonly used to authenticate when deployed,
 * with credentials used to authenticate in a development environment.
 *
 * For more information, you may go to our readme: [link](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
 */

async function main() {
  // AZURE_TOKEN_CREDENTIALS can be set to `EnvironmentCredential` in the .env file in this example.
  // You can specify the list of required environment variables like this:
  const credential = new DefaultAzureCredential({
    requiredEnvVars: [
      "AZURE_CLIENT_ID",
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_TOKEN_CREDENTIALS",
    ],
  });

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

module.exports = { main };
