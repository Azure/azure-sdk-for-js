// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault and creates a SecretClient.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { setLogLevel } from "@azure/logger";

export async function main(): Promise<void> {
  await createASecretClient();
  await createASecretClientWithASpecificVersion();
  await setTheLogLevel();
}

async function createASecretClient(): Promise<void> {

  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"]!;

  const client = new SecretClient(url, credential);

  console.log(client);
}

async function createASecretClientWithASpecificVersion(): Promise<void> {

  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"]!;

  // Change the Azure Key Vault service API version being used via the `serviceVersion` option
  const client = new SecretClient(url, credential, {
      serviceVersion: "7.0", // Supported versions: 7.0 through 7.6
  });

  console.log(client);
}

async function setTheLogLevel(): Promise<void> {

  setLogLevel("info");

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
