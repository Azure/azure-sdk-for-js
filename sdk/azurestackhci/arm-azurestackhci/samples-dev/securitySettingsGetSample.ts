// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SecuritySetting
 *
 * @summary get a SecuritySetting
 * x-ms-original-file: 2025-12-01-preview/GetSecuritySettings.json
 */
async function getSecuritySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securitySettings.get("test-rg", "myCluster", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getSecuritySettings();
}

main().catch(console.error);
