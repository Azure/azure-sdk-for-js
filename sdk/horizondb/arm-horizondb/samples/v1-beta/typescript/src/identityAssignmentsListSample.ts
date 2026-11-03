// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists identity assignments for a change data capture destination.
 *
 * @summary lists identity assignments for a change data capture destination.
 * x-ms-original-file: 2026-10-01-preview/IdentityAssignments_List.json
 */
async function listChangeDataCaptureIdentityAssignments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.identityAssignments.list(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listChangeDataCaptureIdentityAssignments();
}

main().catch(console.error);
