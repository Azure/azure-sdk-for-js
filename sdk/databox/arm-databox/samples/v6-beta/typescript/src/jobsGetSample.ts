// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the specified job.
 *
 * @summary gets information about the specified job.
 * x-ms-original-file: 2025-07-01/JobsGet.json
 */
async function jobsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("YourResourceGroupName", "TestJobName1", {
    expand: "details",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified job.
 *
 * @summary gets information about the specified job.
 * x-ms-original-file: 2025-07-01/JobsGetCmk.json
 */
async function jobsGetCmk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("YourResourceGroupName", "TestJobName1", {
    expand: "details",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified job.
 *
 * @summary gets information about the specified job.
 * x-ms-original-file: 2025-07-01/JobsGetCopyStuck.json
 */
async function jobsGetCopyStuck(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("YourResourceGroupName", "TestJobName1", {
    expand: "details",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified job.
 *
 * @summary gets information about the specified job.
 * x-ms-original-file: 2025-07-01/JobsGetExport.json
 */
async function jobsGetExport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("YourResourceGroupName", "TestJobName1", {
    expand: "details",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified job.
 *
 * @summary gets information about the specified job.
 * x-ms-original-file: 2025-07-01/JobsGetWaitingForAction.json
 */
async function jobsGetWaitingForAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("YourResourceGroupName", "TestJobName1", {
    expand: "details",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await jobsGet();
  await jobsGetCmk();
  await jobsGetCopyStuck();
  await jobsGetExport();
  await jobsGetWaitingForAction();
}

main().catch(console.error);
