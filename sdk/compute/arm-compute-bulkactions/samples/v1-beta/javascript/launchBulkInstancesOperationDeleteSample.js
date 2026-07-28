// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes LaunchBulkInstancesOperations.
 *
 * @summary deletes LaunchBulkInstancesOperations.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Delete_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationDeleteExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  await client.launchBulkInstancesOperation.delete(
    "rgBulkactions",
    "useast2euap",
    "8a71b9df-efee-48a9-a381-4e6d60b4304f",
    { deleteInstances: true },
  );
}

async function main() {
  await launchBulkInstancesOperationDeleteExample();
}

main().catch(console.error);
