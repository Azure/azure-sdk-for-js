// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using Azure Developer CLI Credential
 */

const { AzureDeveloperCliCredential, DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

async function testDefaultCredential() {
  const credential = new DefaultAzureCredential();

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
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

async function main() {
  await testDefaultCredential();
  await testAzureDeveloperCliCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
