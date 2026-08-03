// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels LaunchBulkInstancesOperation instances that have not yet launched.
 *
 * @summary cancels LaunchBulkInstancesOperation instances that have not yet launched.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Cancel_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationCancelExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F3";
  const client = new ComputeClient(credential, subscriptionId);
  await client.launchBulkInstancesOperation.cancel(
    "rgBulkactions",
    "useast2euap",
    "434d5a2a-167a-4e26-a89c-fbe622dfd0bc",
  );
}

async function main() {
  await launchBulkInstancesOperationCancelExample();
}

main().catch(console.error);
