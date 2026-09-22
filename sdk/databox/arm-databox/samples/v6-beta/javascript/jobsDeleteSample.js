// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a job.
 *
 * @summary deletes a job.
 * x-ms-original-file: 2025-07-01/JobsDelete.json
 */
async function jobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  await client.jobs.delete("YourResourceGroupName", "TestJobName1");
}

async function main() {
  await jobsDelete();
}

main().catch(console.error);
