// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Managed HSM and creates access control, backup, and settings clients.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const {
  KeyVaultAccessControlClient,
  KeyVaultBackupClient,
  KeyVaultSettingsClient,
} = require("@azure/keyvault-admin");
const { setLogLevel } = require("@azure/logger");

async function createAnAccessControlClient() {
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  const credentials = new DefaultAzureCredential();
  const client = new KeyVaultAccessControlClient(url, credentials);
}

async function createABackupClient() {
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  const credentials = new DefaultAzureCredential();
  const client = new KeyVaultBackupClient(url, credentials);
}

async function createASettingsClient() {
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  const credentials = new DefaultAzureCredential();
  const client = new KeyVaultSettingsClient(url, credentials);
}

async function setTheLogLevel() {
  setLogLevel("info");
}

async function main() {
  await createAnAccessControlClient();
  await createABackupClient();
  await createASettingsClient();
  await setTheLogLevel();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
