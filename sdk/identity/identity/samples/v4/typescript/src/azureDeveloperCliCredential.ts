// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using Azure Developer CLI Credential
 */

import { AzureDeveloperCliCredential, DefaultAzureCredential } from "@azure/identity";

import dotenv from "dotenv";

dotenv.config();

async function testDefaultCredential() {
  const credential = new DefaultAzureCredential();

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(
      "DefaultAzureCredential: Successfully got a token with expiry time:",
      token.expiresOnTimestamp,
    );
  } catch (err) {
    console.log("Error with DefaultAzureCredential:", err);
  }
}

async function testAzureDeveloperCliCredential() {
  const credential = new AzureDeveloperCliCredential({
    tenantId: process.env.AZURE_TENANT_ID,
  });

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(
      "AzureDeveloperCliCredential: Successfully got a token with expiry time:",
      token.expiresOnTimestamp,
    );
  } catch (err) {
    console.log("Error with Credential:", err);
  }
}

async function main() {
  await testDefaultCredential();
  await testAzureDeveloperCliCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
