// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a stopped HorizonDB pool. Power operations are supported only at pool scope in this API version; there is no cluster-level start action. Start does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot until a customer-initiated Restart. When the pool is already Ready, the operation succeeds as a true idempotent no-op and likewise leaves pending parameter changes pending. The operation is allowed when the pool has no allocated nodes. After the Pool is running, its Pool-scoped ReadOnly Endpoint routes only when at least one allocated node is not currently playing the read-write role. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state.
 *
 * @summary starts a stopped HorizonDB pool. Power operations are supported only at pool scope in this API version; there is no cluster-level start action. Start does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot until a customer-initiated Restart. When the pool is already Ready, the operation succeeds as a true idempotent no-op and likewise leaves pending parameter changes pending. The operation is allowed when the pool has no allocated nodes. After the Pool is running, its Pool-scoped ReadOnly Endpoint routes only when at least one allocated node is not currently playing the read-write role. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state.
 * x-ms-original-file: 2026-10-01-preview/Pools_Start.json
 */
async function startAHorizonDBPoolWithoutApplyingPendingParameterChanges(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.start(
    "exampleresourcegroup",
    "examplecluster",
    "example-pool-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startAHorizonDBPoolWithoutApplyingPendingParameterChanges();
}

main().catch(console.error);
