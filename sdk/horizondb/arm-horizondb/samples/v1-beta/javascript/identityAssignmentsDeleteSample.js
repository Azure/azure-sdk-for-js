// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an inactive change data capture identity assignment.
 *
 * @summary deletes an inactive change data capture identity assignment.
 * x-ms-original-file: 2026-10-01-preview/IdentityAssignments_Delete.json
 */
async function deleteAnInactiveChangeDataCaptureIdentityAssignment() {
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

async function main() {
  await deleteAnInactiveChangeDataCaptureIdentityAssignment();
}

main().catch(console.error);
