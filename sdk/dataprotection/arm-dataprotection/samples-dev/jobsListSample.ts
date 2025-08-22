// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of jobs belonging to a backup vault
 *
 * @summary Returns list of jobs belonging to a backup vault
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/JobCRUD/ListJobs.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getJobs(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "BugBash1";
  const vaultName = "BugBashVaultForCCYv11";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list(resourceGroupName, vaultName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getJobs();
}

main().catch(console.error);
