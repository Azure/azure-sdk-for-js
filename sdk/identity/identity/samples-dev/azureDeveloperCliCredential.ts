// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using Azure Developer CLI Credential
 */

import { AzureDeveloperCliCredential, DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

// Load the .env file if it exists
dotenv.config();

async function testDefaultCredential(): Promise<void> {
  const credential = new DefaultAzureCredential();

  const { token } = await credential.getToken("https://storage.azure.com/.default");
  console.log(`Token: ${token}`);
}

async function testAzureDeveloperCliCredential(): Promise<void> {
  const credential = new AzureDeveloperCliCredential({
    tenantId: process.env.AZURE_TENANT_ID,
  });

  const { token } = await credential.getToken("https://storage.azure.com/.default");
  console.log(`Token: ${token}`);
}

async function main(): Promise<void> {
  await testDefaultCredential();
  await testAzureDeveloperCliCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
