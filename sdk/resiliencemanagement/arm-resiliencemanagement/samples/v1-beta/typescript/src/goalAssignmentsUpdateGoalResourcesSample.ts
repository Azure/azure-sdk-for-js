// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action to exclude a resource from goal assignment.
 *
 * @summary action to exclude a resource from goal assignment.
 * x-ms-original-file: 2026-09-30-preview/GoalAssignments_UpdateGoalResources_MaximumSet_Gen.json
 */
async function goalAssignmentsUpdateGoalResourcesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.updateGoalResources("sg1", "ga1", {
    resources: [
      {
        properties: {
          resourceArmId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine",
          zonalResiliency: { goalParticipation: "Excluded", attestationStatus: "ManuallyAttested" },
          regionalResiliency: {
            goalParticipation: "Excluded",
            attestationStatus: "ManuallyAttested",
          },
        },
      },
      {
        properties: {
          resourceArmId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine1",
          zonalResiliency: { goalParticipation: "Excluded", attestationStatus: "ManuallyAttested" },
          regionalResiliency: {
            goalParticipation: "Excluded",
            attestationStatus: "ManuallyAttested",
          },
        },
      },
    ],
  });
}

async function main(): Promise<void> {
  await goalAssignmentsUpdateGoalResourcesMaximumSet();
}

main().catch(console.error);
