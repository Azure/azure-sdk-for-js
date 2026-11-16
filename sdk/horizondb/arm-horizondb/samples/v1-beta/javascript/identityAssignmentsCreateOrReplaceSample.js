// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or idempotently replaces a change data capture identity assignment. The identity resource ID is immutable and must reference a user-assigned managed identity already attached to the parent cluster. The service also validates destination permissions, which are not granted by attaching the identity to the cluster.
 *
 * @summary creates or idempotently replaces a change data capture identity assignment. The identity resource ID is immutable and must reference a user-assigned managed identity already attached to the parent cluster. The service also validates destination permissions, which are not granted by attaching the identity to the cluster.
 * x-ms-original-file: 2026-10-01-preview/IdentityAssignments_CreateOrReplace.json
 */
async function createAChangeDataCaptureIdentityAssignmentForAUamiAttachedToTheParentCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.identityAssignments.createOrReplace(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
    "fabric-writer",
    {
      properties: {
        identityResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/identity-resource-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/fabric-writer",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAChangeDataCaptureIdentityAssignmentForAUamiAttachedToTheParentCluster();
}

main().catch(console.error);
