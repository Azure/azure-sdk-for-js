// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a running HorizonDB pool and deallocates compute. Power operations are supported only at pool scope in this API version; there is no cluster-level stop action. Stop does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot. A subsequent Start also preserves those pending changes. The operation succeeds as an idempotent no-op when the pool is already Stopped. It is allowed when the pool has no allocated nodes. The Pool-scoped ReadOnly Endpoint remains discoverable but has no routing destination while the Pool is Stopped. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state.
 *
 * @summary stops a running HorizonDB pool and deallocates compute. Power operations are supported only at pool scope in this API version; there is no cluster-level stop action. Stop does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot. A subsequent Start also preserves those pending changes. The operation succeeds as an idempotent no-op when the pool is already Stopped. It is allowed when the pool has no allocated nodes. The Pool-scoped ReadOnly Endpoint remains discoverable but has no routing destination while the Pool is Stopped. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state.
 * x-ms-original-file: 2026-10-01-preview/Pools_Stop.json
 */
async function stopAndDeallocateAHorizonDBPoolWithoutApplyingPendingParameterChanges() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.stop(
    "exampleresourcegroup",
    "examplecluster",
    "example-pool-01",
  );
  console.log(result);
}

async function main() {
  await stopAndDeallocateAHorizonDBPoolWithoutApplyingPendingParameterChanges();
}

main().catch(console.error);
