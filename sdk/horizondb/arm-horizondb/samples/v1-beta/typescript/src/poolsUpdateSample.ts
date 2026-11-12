// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 *
 * @summary updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 * x-ms-original-file: 2026-10-01-preview/Pools_Update.json
 */
async function updateASingleHorizonDBPoolComputeProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.update(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    {
      properties: {
        computeModel: { vCores: 16 },
        scheduledMaintenance: { maintenanceManagementType: "System" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 *
 * @summary updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 * x-ms-original-file: 2026-10-01-preview/Pools_UpdateHighAvailabilityMode.json
 */
async function requireZoneRedundantPlacementForAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.update(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    { properties: { highAvailability: { mode: "ZoneRedundant" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 *
 * @summary updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 * x-ms-original-file: 2026-10-01-preview/Pools_UpdateParameterGroupDefault.json
 */
async function switchAHorizonDBPoolBackToItsCorrespondingDefaultParameterGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.update(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    {
      properties: {
        parameterGroup: {
          parameterGroupResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/providers/Microsoft.HorizonDb/locations/eastus2/parameterGroups/default-postgresql-17-provisioned",
          applyMethod: "Immediate",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 *
 * @summary updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 * x-ms-original-file: 2026-10-01-preview/Pools_UpdateParameterGroupImmediate.json
 */
async function associateAHorizonDBPoolWithAParameterGroupImmediately(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.update(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    {
      properties: {
        parameterGroup: {
          parameterGroupResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/example-resource-group/providers/Microsoft.HorizonDb/parameterGroups/production-parameters",
          applyMethod: "Immediate",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 *
 * @summary updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration.
 * x-ms-original-file: 2026-10-01-preview/Pools_UpdateParameterGroupPendingReboot.json
 */
async function associateAHorizonDBPoolWithAParameterGroupPendingReboot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.update(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    {
      properties: {
        parameterGroup: {
          parameterGroupResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/example-resource-group/providers/Microsoft.HorizonDb/parameterGroups/maintenance-window-parameters",
          applyMethod: "PendingReboot",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateASingleHorizonDBPoolComputeProperty();
  await requireZoneRedundantPlacementForAHorizonDBPool();
  await switchAHorizonDBPoolBackToItsCorrespondingDefaultParameterGroup();
  await associateAHorizonDBPoolWithAParameterGroupImmediately();
  await associateAHorizonDBPoolWithAParameterGroupPendingReboot();
}

main().catch(console.error);
