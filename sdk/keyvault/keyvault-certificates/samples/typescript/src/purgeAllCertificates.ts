// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// purgeAllCertificates.ts
// helps remove any existing resources from the KeyVault.

import { CertificateClient } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new CertificateClient(url, credential);

  for await (const properties of client.listPropertiesOfCertificates()) {
    try {
      const poller = await client.beginDeleteCertificate(properties.name!);
      await poller.pollUntilDone();
    } catch (e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
  }
  for await (const deletedCertificate of client.listDeletedCertificates()) {
    try {
      // This will take a while.
      await client.purgeDeletedCertificate(deletedCertificate.name!);
    } catch (e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
