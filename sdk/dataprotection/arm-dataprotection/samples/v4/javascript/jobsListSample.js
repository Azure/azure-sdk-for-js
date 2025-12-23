// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns list of jobs belonging to a backup vault
 *
 * @summary returns list of jobs belonging to a backup vault
 * x-ms-original-file: 2025-07-01/JobCRUD/ListJobs.json
 */
async function getJobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("BugBash1", "BugBashVaultForCCYv11")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getJobs();
}

main().catch(console.error);
