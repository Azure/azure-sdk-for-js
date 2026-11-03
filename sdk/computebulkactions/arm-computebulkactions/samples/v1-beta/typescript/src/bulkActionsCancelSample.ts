// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeBulkActionsClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels LaunchBulkInstancesOperation instances that have not yet launched.
 *
 * @summary cancels LaunchBulkInstancesOperation instances that have not yet launched.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_Cancel_MaximumSet_Gen.json
 */
async function bulkActionsCancelGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  await client.bulkActions.cancel(
    "rgcomputebulkactions",
    "eastus2euap",
    "3ec2ab23-9f13-4328-85c8-21928acbc7b8",
  );
}

async function main(): Promise<void> {
  await bulkActionsCancelGeneratedByMaximumSetRule();
}

main().catch(console.error);
