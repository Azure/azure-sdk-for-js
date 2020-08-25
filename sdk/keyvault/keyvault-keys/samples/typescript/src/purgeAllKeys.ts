// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// purgeAllKeys.ts
// helps remove any existing keys from the KeyVault.

import { KeyClient } from "@azure/keyvault-keys";
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

  const client = new KeyClient(url, credential, {
    // The KEYVAULT_API_VERSION environment variable is used by our CI pipelines to run the samples and check their validity automatically.
    // The serviceVersion is an optional parameter that allows users to specify a Key Vault service API version.
    serviceVersion: process.env.KEYVAULT_API_VERSION
  });

  for await (const properties of client.listPropertiesOfKeys()) {
    try {
      const poller = await client.beginDeleteKey(properties.name);
      await poller.pollUntilDone();
    } catch (e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
  }
  for await (const deletedKey of client.listDeletedKeys()) {
    try {
      // This will take a while.
      await client.purgeDeletedKey(deletedKey.name);
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
