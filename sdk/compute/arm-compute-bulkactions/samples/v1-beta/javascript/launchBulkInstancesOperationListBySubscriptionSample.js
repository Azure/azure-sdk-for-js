// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list LaunchBulkInstancesOperation resources by subscriptionId.
 *
 * @summary list LaunchBulkInstancesOperation resources by subscriptionId.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_ListBySubscription_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationListBySubscriptionExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.launchBulkInstancesOperation.listBySubscription("useast2euap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list LaunchBulkInstancesOperation resources by subscriptionId.
 *
 * @summary list LaunchBulkInstancesOperation resources by subscriptionId.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_ListBySubscription_MinimumSet_Gen.json
 */
async function launchBulkInstancesOperationListBySubscriptionExampleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.launchBulkInstancesOperation.listBySubscription("useast2euap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await launchBulkInstancesOperationListBySubscriptionExample();
  await launchBulkInstancesOperationListBySubscriptionExampleGeneratedByMinimumSetRule();
}

main().catch(console.error);
