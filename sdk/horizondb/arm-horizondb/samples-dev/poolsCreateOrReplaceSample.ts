// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDB pool or replaces an existing pool, including its node allocation, compute model, high-availability configuration, or associated parameter group. nodeCount and highAvailability.mode are required and have no service defaults. nodeCount must be 1 through 16. Disabled is valid only when nodeCount is 1. AnyZone and ZoneRedundant are valid only when nodeCount is 2 through 16. AnyZone permits same-zone or cross-zone placement, while ZoneRedundant requires nodes to be allocated across availability zones. Node allocation and high-availability reconfiguration are atomic: if all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. A pool name must differ from its parent cluster name because the Cluster-scoped ReadWrite Endpoint is named after the Cluster and the Pool-scoped ReadOnly Endpoint is named after the Pool; the service rejects a request whose names would collide. Creating a pool also creates exactly one service-managed Pool-scoped ReadOnly Endpoint representing that Pool and its network boundary. The Endpoint's associatedResourceId identifies the Pool, and the Endpoint cannot outlive or be deleted independently from it. When the first pool is created, the service automatically designates it to host the cluster's read-write node when an eligible node is available. A Cluster must contain at least one Pool before a private endpoint connection can be created or approved. This API version supports at most one pool per cluster; an attempt to create another pool is rejected with 409 Conflict. parameterGroup, parameterGroupResourceId, and applyMethod are required. When creating a new pool in this API version, parameterGroupResourceId must identify the corresponding default parameter group; a customer-created parameter group is rejected. When replacing an existing pool, the request can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated before the resource is changed.
 *
 * @summary creates a new HorizonDB pool or replaces an existing pool, including its node allocation, compute model, high-availability configuration, or associated parameter group. nodeCount and highAvailability.mode are required and have no service defaults. nodeCount must be 1 through 16. Disabled is valid only when nodeCount is 1. AnyZone and ZoneRedundant are valid only when nodeCount is 2 through 16. AnyZone permits same-zone or cross-zone placement, while ZoneRedundant requires nodes to be allocated across availability zones. Node allocation and high-availability reconfiguration are atomic: if all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. A pool name must differ from its parent cluster name because the Cluster-scoped ReadWrite Endpoint is named after the Cluster and the Pool-scoped ReadOnly Endpoint is named after the Pool; the service rejects a request whose names would collide. Creating a pool also creates exactly one service-managed Pool-scoped ReadOnly Endpoint representing that Pool and its network boundary. The Endpoint's associatedResourceId identifies the Pool, and the Endpoint cannot outlive or be deleted independently from it. When the first pool is created, the service automatically designates it to host the cluster's read-write node when an eligible node is available. A Cluster must contain at least one Pool before a private endpoint connection can be created or approved. This API version supports at most one pool per cluster; an attempt to create another pool is rejected with 409 Conflict. parameterGroup, parameterGroupResourceId, and applyMethod are required. When creating a new pool in this API version, parameterGroupResourceId must identify the corresponding default parameter group; a customer-created parameter group is rejected. When replacing an existing pool, the request can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated before the resource is changed.
 * x-ms-original-file: 2026-10-01-preview/Pools_CreateOrReplace.json
 */
async function createAMinimumProvisionedHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.createOrReplace(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    {
      properties: {
        computeModel: {
          type: "Provisioned",
          computeProcessor: "AMD",
          computeGeneration: 3,
          vCores: 2,
        },
        parameterGroup: {
          parameterGroupResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/providers/Microsoft.HorizonDb/locations/eastus2/parameterGroups/default-postgresql-17-provisioned",
          applyMethod: "Immediate",
        },
        scheduledMaintenance: { maintenanceManagementType: "System" },
        nodeCount: 1,
        highAvailability: { mode: "Disabled" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAMinimumProvisionedHorizonDBPool();
}

main().catch(console.error);
