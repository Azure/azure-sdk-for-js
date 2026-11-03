// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeBulkActionsClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of a LaunchBulkInstancesOperation.
 *
 * @summary get the status of a LaunchBulkInstancesOperation.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_GetOperationStatus_MaximumSet_Gen.json
 */
async function bulkActionsGetOperationStatusGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.getOperationStatus(
    "eastus2euap",
    "2a3fce8e-874c-45f4-9d27-1a804f3b7a0f",
  );
  console.log(result);
}

async function main() {
  await bulkActionsGetOperationStatusGeneratedByMaximumSetRule();
}

main().catch(console.error);
