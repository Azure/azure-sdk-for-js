// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using all developer credentials.
 */

import {
  AzureDeveloperCliCredential,
  DefaultAzureCredential,
  AzurePowerShellCredential,
  AzureCliCredential,
} from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

async function testDefaultCredential() {
  const credential = new DefaultAzureCredential();

  try {
    const token = await credential.getToken("https://graph.microsoft.com/.default");
    if (token) console.log("Successfully got token from DefaultAzureCredential");
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
    console.log(token);
  } catch (err) {
    console.log("Error with Credential:", err);
  }
}

async function testAzurePowerShellCredential() {
  const credential = new AzurePowerShellCredential();
  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
  } catch (err) {
    console.log("Error with Credential:", err);
  }
}

async function testAzureCliCredential() {
  const credential = new AzureCliCredential();
  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
  } catch (err) {
    console.log("Error with Credential:", err);
  }
}

async function main() {
  await testDefaultCredential();
  await testAzureDeveloperCliCredential();
  await testAzurePowerShellCredential();
  await testAzureCliCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
