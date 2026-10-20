// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to atomically activates a validated identity assignment for this destination. If-Match is evaluated against the destination entity tag. Activating the already-active assignment succeeds idempotently.
 *
 * @summary atomically activates a validated identity assignment for this destination. If-Match is evaluated against the destination entity tag. Activating the already-active assignment succeeds idempotently.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_ActivateIdentity.json
 */
async function activateAValidatedIdentityAssignmentForAChangeDataCaptureDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureDestinations.activateIdentity(
    "example-resource-group",
    "*",
    "example-cluster",
    "fabric-mirroring",
    {
      identityAssignmentResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/example-resource-group/providers/Microsoft.HorizonDb/clusters/example-cluster/changeDataCaptureDestinations/fabric-mirroring/identityAssignments/fabric-writer",
      drainExistingSessions: true,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await activateAValidatedIdentityAssignmentForAChangeDataCaptureDestination();
}

main().catch(console.error);
