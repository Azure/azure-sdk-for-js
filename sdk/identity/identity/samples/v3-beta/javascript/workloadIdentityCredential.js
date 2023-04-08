// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using Workload Identity Credential
 */

const { DefaultAzureCredential, WorkloadIdentityCredential } = require("@azure/identity");
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

async function testWorkloadCredential() {
  const credential = new WorkloadIdentityCredential({
    tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
    clientId: "client-id",
  });

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
  } catch (err) {
    console.log("Error with WorkloadIdentityCredential:", err);
  }
}

async function main() {
  await testDefaultCredential();
  await testWorkloadCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
