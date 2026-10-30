// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a goal assignment.
 *
 * @summary creates or updates a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function goalAssignmentsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.createOrUpdate("production-sg", "zonal-resiliency-goal", {
    properties: {
      serviceLevelResources: [
        {
          serviceLevelIndicatorResourceId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine",
        },
      ],
      requireZonalResiliency: true,
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a goal assignment.
 *
 * @summary creates or updates a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_CreateOrUpdate_MinimumSet_Gen.json
 */
async function goalAssignmentsCreateOrUpdateMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.createOrUpdate("production-sg", "zonal-resiliency-goal", {
    properties: { requireZonalResiliency: true },
  });
}

async function main(): Promise<void> {
  await goalAssignmentsCreateOrUpdateMaximumSet();
  await goalAssignmentsCreateOrUpdateMinimumSet();
}

main().catch(console.error);
