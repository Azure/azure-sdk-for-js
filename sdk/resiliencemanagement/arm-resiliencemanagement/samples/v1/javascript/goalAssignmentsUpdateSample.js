// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a goal assignment.
 *
 * @summary updates a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_Update_MaximumSet_Gen.json
 */
async function goalAssignmentsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.update("production-sg", "zonal-resiliency-goal", {
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

async function main() {
  await goalAssignmentsUpdateMaximumSet();
}

main().catch(console.error);
