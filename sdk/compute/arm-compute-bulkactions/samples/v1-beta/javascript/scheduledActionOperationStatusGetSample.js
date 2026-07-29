// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of a ScheduledActions asynchronous operation. Both the `Azure-AsyncOperation` and `Location` headers returned by long-running operations point at this endpoint.
 *
 * @summary get the status of a ScheduledActions asynchronous operation. Both the `Azure-AsyncOperation` and `Location` headers returned by long-running operations point at this endpoint.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActionOperationStatus_Get_MaximumSet_Gen.json
 */
async function scheduledActionOperationStatusGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActionOperationStatus.get(
    "eastus",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await scheduledActionOperationStatusGetMaximumSet();
}

main().catch(console.error);
