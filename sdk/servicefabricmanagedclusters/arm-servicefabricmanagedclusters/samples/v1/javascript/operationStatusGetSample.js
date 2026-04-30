// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get long running operation status.
 *
 * @summary get long running operation status.
 * x-ms-original-file: 2026-02-01/OperationStatusFailed_example.json
 */
async function errorResponseDescribingWhyTheOperationFailed() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.operationStatus.get("eastus", "00000000-0000-0000-0000-000000001234");
  console.log(result);
}

/**
 * This sample demonstrates how to get long running operation status.
 *
 * @summary get long running operation status.
 * x-ms-original-file: 2026-02-01/OperationStatusSucceeded_example.json
 */
async function okTheRequestHasSucceeded() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.operationStatus.get("eastus", "00000000-0000-0000-0000-000000001234");
  console.log(result);
}

async function main() {
  await errorResponseDescribingWhyTheOperationFailed();
  await okTheRequestHasSucceeded();
}

main().catch(console.error);
