// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts the PostgreSQL container on all allocated nodes in a ready HorizonDB pool and applies pending dynamic and static parameter changes. This customer-initiated Restart is the only operation that applies static parameter changes or dynamic parameter changes requested with PendingReboot; Stop followed by Start and scheduled maintenance do not apply them. Power operations are supported only at pool scope in this API version; there is no cluster-level restart action. When the pool has no allocated nodes, the operation succeeds without restarting any nodes, pending changes are considered applied, parameterGroup.syncStatus becomes InSync, and the resulting configuration applies to nodes allocated later. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state.
 *
 * @summary restarts the PostgreSQL container on all allocated nodes in a ready HorizonDB pool and applies pending dynamic and static parameter changes. This customer-initiated Restart is the only operation that applies static parameter changes or dynamic parameter changes requested with PendingReboot; Stop followed by Start and scheduled maintenance do not apply them. Power operations are supported only at pool scope in this API version; there is no cluster-level restart action. When the pool has no allocated nodes, the operation succeeds without restarting any nodes, pending changes are considered applied, parameterGroup.syncStatus becomes InSync, and the resulting configuration applies to nodes allocated later. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state.
 * x-ms-original-file: 2026-10-01-preview/Pools_Restart.json
 */
async function restartAHorizonDBPoolAndApplyPendingParameterChanges(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.restart(
    "exampleresourcegroup",
    "examplecluster",
    "example-pool-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartAHorizonDBPoolAndApplyPendingParameterChanges();
}

main().catch(console.error);
