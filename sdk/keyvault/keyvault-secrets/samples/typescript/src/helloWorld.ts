// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SecretClient } from "@azure/keyvault-secrets";
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

  const client = new SecretClient(url, credential);

  // Create a secret
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  const result = await client.setSecret(secretName, "MySecretValue");
  console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  // Update the secret with different attributes
  const updatedSecret = await client.updateSecretProperties(
    secretName,
    result.properties.version!,
    {
      enabled: false,
    }
  );
  console.log("updated secret: ", updatedSecret);

  // Delete the secret
  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
