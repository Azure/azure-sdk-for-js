// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancelJob.
 *
 * @summary cancelJob.
 * x-ms-original-file: 2025-07-01/JobsCancelPost.json
 */
async function jobsCancelPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  await client.jobs.cancel("YourResourceGroupName", "TestJobName1", { reason: "CancelTest" });
}

async function main(): Promise<void> {
  await jobsCancelPost();
}

main().catch(console.error);
