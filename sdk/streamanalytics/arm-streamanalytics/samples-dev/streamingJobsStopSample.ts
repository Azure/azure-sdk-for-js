// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Stops a running streaming job. This will cause a running streaming job to stop processing input events and producing output.
 *
 * @summary Stops a running streaming job. This will cause a running streaming job to stop processing input events and producing output.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2021-10-01-preview/examples/StreamingJob_Stop.json
 */

import { StreamAnalyticsManagementClient } from "@azure/arm-streamanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function stopAStreamingJob(): Promise<void> {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "56b5e0a9-b645-407d-99b0-c64f86013e3d";
  const resourceGroupName = process.env["STREAMANALYTICS_RESOURCE_GROUP"] || "sjrg6936";
  const jobName = "sj59";
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.streamingJobs.beginStopAndWait(resourceGroupName, jobName);
  console.log(result);
}

async function main(): Promise<void> {
  await stopAStreamingJob();
}

main().catch(console.error);
