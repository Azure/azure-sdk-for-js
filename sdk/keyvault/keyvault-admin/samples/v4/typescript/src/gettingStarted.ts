// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Managed HSM and creates access control, backup, and settings clients.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import {
  KeyVaultAccessControlClient,
  KeyVaultBackupClient,
  KeyVaultSettingsClient,
} from "@azure/keyvault-admin";
import { setLogLevel } from "@azure/logger";

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

export async function main(): Promise<void> {
  await createAnAccessControlClient();
  await createABackupClient();
  await createASettingsClient();
  await setTheLogLevel();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
