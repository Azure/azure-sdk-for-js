// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancelJob.
 *
 * @summary cancelJob.
 * x-ms-original-file: 2025-07-01/JobsCancelPost.json
 */
async function jobsCancelPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  await client.jobs.cancel("YourResourceGroupName", "TestJobName1", { reason: "CancelTest" });
}

async function main() {
  await jobsCancelPost();
}

main().catch(console.error);
