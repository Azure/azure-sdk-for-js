// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeBulkActionsClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes LaunchBulkInstancesOperations.
 *
 * @summary deletes LaunchBulkInstancesOperations.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_Delete_MaximumSet_Gen.json
 */
async function bulkActionsDeleteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  await client.bulkActions.delete(
    "rgcomputebulkactions",
    "eastus2euap",
    "3ec2ab23-9f13-4328-85c8-21928acbc7b8",
  );
}

async function main() {
  await bulkActionsDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
