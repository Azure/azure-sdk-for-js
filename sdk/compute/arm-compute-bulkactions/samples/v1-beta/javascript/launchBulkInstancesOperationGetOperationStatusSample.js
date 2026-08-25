// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of a LaunchBulkInstancesOperation.
 *
 * @summary get the status of a LaunchBulkInstancesOperation.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_GetOperationStatus_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationGetOperationStatusExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.launchBulkInstancesOperation.getOperationStatus(
    "useast2euap",
    "8596407e-8834-4a62-8d3c-9231af92d785",
  );
  console.log(result);
}

async function main() {
  await launchBulkInstancesOperationGetOperationStatusExample();
}

main().catch(console.error);
