// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the total number of connected resources for the given marketplace subscription Id
 *
 * @summary get the total number of connected resources for the given marketplace subscription Id
 * x-ms-original-file: 2024-04-24/Monitors_GetAllConnectedResourcesCount_MaximumSet_Gen.json
 */
async function monitorsGetAllConnectedResourcesCountMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getAllConnectedResourcesCount({
    marketplaceSubscriptionId: "00000000-0000-0000-0000-000005430000",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the total number of connected resources for the given marketplace subscription Id
 *
 * @summary get the total number of connected resources for the given marketplace subscription Id
 * x-ms-original-file: 2024-04-24/Monitors_GetAllConnectedResourcesCount_MinimumSet_Gen.json
 */
async function monitorsGetAllConnectedResourcesCountMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getAllConnectedResourcesCount({
    marketplaceSubscriptionId: "00000000-0000-0000-0000-000005430000",
  });
  console.log(result);
}

async function main() {
  await monitorsGetAllConnectedResourcesCountMaximumSetGen();
  await monitorsGetAllConnectedResourcesCountMinimumSetGen();
}

main().catch(console.error);
