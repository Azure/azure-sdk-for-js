// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to CancelJob.
 *
 * @summary CancelJob.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsCancelPost.json
 */

import {
  CancellationReason,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function jobsCancelPost(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const cancellationReason: CancellationReason = { reason: "CancelTest" };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.cancel(
    resourceGroupName,
    jobName,
    cancellationReason,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobsCancelPost();
}

main().catch(console.error);
