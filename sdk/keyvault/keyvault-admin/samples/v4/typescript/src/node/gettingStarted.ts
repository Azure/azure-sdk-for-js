// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Managed HSM and creates access control, backup, and settings clients.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { KeyVaultAccessControlClient, KeyVaultBackupClient, KeyVaultSettingsClient } from "@azure/keyvault-admin";
import { setLogLevel } from "@azure/logger";

export async function main(): Promise<void> {
  await createAnAccessControlClient();
  await createABackupClient();
  await createASettingsClient();
  await setTheLogLevel();
}

async function createAnAccessControlClient(): Promise<void> {

  const url = process.env["AZURE_MANAGEDHSM_URI"]!;
  const credentials = new DefaultAzureCredential();
  const client = new KeyVaultAccessControlClient(url, credentials);

  console.log(client);
}

async function createABackupClient(): Promise<void> {

  const url = process.env["AZURE_MANAGEDHSM_URI"]!;
  const credentials = new DefaultAzureCredential();
  const client = new KeyVaultBackupClient(url, credentials);

  console.log(client);
}

async function createASettingsClient(): Promise<void> {

  const url = process.env["AZURE_MANAGEDHSM_URI"]!;
  const credentials = new DefaultAzureCredential();
  const client = new KeyVaultSettingsClient(url, credentials);

  console.log(client);
}

async function setTheLogLevel(): Promise<void> {

  setLogLevel("info");

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
