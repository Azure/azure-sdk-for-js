// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an instance of LaunchBulkInstancesOperations.
 *
 * @summary gets an instance of LaunchBulkInstancesOperations.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Get_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationGetExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.launchBulkInstancesOperation.get(
    "rgBulkactions",
    "useast2euap",
    "495544ae-8710-4e8b-bca3-49a1dbb1623a",
  );
  console.log(result);
}

async function main() {
  await launchBulkInstancesOperationGetExample();
}

main().catch(console.error);
