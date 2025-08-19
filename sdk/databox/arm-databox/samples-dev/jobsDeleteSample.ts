// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a job.
 *
 * @summary Deletes a job.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsDelete.json
 */
async function jobsDelete(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.beginDeleteAndWait(
    resourceGroupName,
    jobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobsDelete();
}

main().catch(console.error);
