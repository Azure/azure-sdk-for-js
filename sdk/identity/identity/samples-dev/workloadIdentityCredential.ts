// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using Workload Identity Credential
 */

import { DefaultAzureCredential, WorkloadIdentityCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

async function testDefaultCredential(): Promise<void> {
  const credential = new DefaultAzureCredential();

  const { token } = await credential.getToken("https://storage.azure.com/.default");
  console.log(`Token: ${token}`);
}

async function testWorkloadCredential(): Promise<void> {
  const credential = new WorkloadIdentityCredential({
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
  });

  const result = await credential.getToken("https://storage.azure.com/.default");
  console.log(`Token: ${result?.token}`);
}

async function main(): Promise<void> {
  await testDefaultCredential();
  await testWorkloadCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
