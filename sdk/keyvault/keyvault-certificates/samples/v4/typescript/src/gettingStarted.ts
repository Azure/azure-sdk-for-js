// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault and creates a CertificateClient.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient } from "@azure/keyvault-certificates";
import { setLogLevel } from "@azure/logger";
// Load the .env file if it exists
import "dotenv/config";

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

export async function main(): Promise<void> {
  await createACertificateClient();
  await createACertificateClientWithASpecificVersion();
  await setTheLogLevel();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
