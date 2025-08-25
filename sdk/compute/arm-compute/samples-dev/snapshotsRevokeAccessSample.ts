// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Revokes access to a snapshot.
 *
 * @summary Revokes access to a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/snapshotExamples/Snapshot_EndGetAccess.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function revokeAccessToASnapshot(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const snapshotName = "mySnapshot";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.beginRevokeAccessAndWait(
    resourceGroupName,
    snapshotName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await revokeAccessToASnapshot();
}

main().catch(console.error);
