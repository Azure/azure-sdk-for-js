// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an inactive change data capture identity assignment.
 *
 * @summary deletes an inactive change data capture identity assignment.
 * x-ms-original-file: 2026-10-01-preview/IdentityAssignments_Delete.json
 */
async function deleteAnInactiveChangeDataCaptureIdentityAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.identityAssignments.delete(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
    "fabric-writer",
  );
}

async function main(): Promise<void> {
  await deleteAnInactiveChangeDataCaptureIdentityAssignment();
}

main().catch(console.error);
