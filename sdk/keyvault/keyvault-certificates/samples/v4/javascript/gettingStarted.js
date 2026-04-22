// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault and creates a CertificateClient.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
const { setLogLevel } = require("@azure/logger");

async function createACertificateClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const client = new CertificateClient(url, credential);
}

async function createACertificateClientWithASpecificVersion() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  // Change the Azure Key Vault service API version being used via the `serviceVersion` option
  const client = new CertificateClient(url, credential, {
    serviceVersion: "7.5",
  });
}

async function setTheLogLevel() {
  setLogLevel("info");
}

async function main() {
  await createACertificateClient();
  await createACertificateClientWithASpecificVersion();
  await setTheLogLevel();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
