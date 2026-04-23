// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault and creates a SecretClient.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { setLogLevel } = require("@azure/logger");

async function createASecretClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const client = new SecretClient(url, credential);
}

async function createASecretClientWithASpecificVersion() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  // Change the Azure Key Vault service API version being used via the `serviceVersion` option
  const client = new SecretClient(url, credential, {
    serviceVersion: "7.0", // Or 7.1
  });
}

async function setTheLogLevel() {
  setLogLevel("info");
}

async function main() {
  await createASecretClient();
  await createASecretClientWithASpecificVersion();
  await setTheLogLevel();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
