// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using Workload Identity Credential
 */

import { DefaultAzureCredential, WorkloadIdentityCredential } from "@azure/identity";

import dotenv from "dotenv";

dotenv.config();

async function testDefaultCredential() {
  const credential = new DefaultAzureCredential();

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log("DefaultAzureCredential: Successfully got a token with expiry time:", token?.expiresOnTimestamp);
  } catch (err) {
    console.log("Error with DefaultAzureCredential:", err);
  }
}

async function testWorkloadCredential() {
  const credential = new WorkloadIdentityCredential({
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
  });

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log("workloadIdentityCredential: Successfully got a token with expiry time:", token?.expiresOnTimestamp);
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
