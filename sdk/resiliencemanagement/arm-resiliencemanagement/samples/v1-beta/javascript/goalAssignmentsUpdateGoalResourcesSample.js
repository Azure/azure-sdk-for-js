// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to action to exclude a resource from goal assignment.
 *
 * @summary action to exclude a resource from goal assignment.
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_UpdateGoalResources_MaximumSet_Gen.json
 */
async function goalAssignmentsUpdateGoalResourcesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.updateGoalResources("sg1", "ga1", {
    resources: [
      {
        properties: {
          resourceArmId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine",
          highAvailabilityGoalParticipation: "Excluded",
          highAvailabilityAttestationStatus: "ManuallyAttested",
          disasterRecoveryGoalParticipation: "Excluded",
          disasterRecoveryAttestationStatus: "ManuallyAttested",
        },
      },
      {
        properties: {
          resourceArmId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine1",
          highAvailabilityGoalParticipation: "Excluded",
          highAvailabilityAttestationStatus: "ManuallyAttested",
          disasterRecoveryGoalParticipation: "Excluded",
          disasterRecoveryAttestationStatus: "ManuallyAttested",
        },
      },
    ],
  });
}

async function main() {
  await goalAssignmentsUpdateGoalResourcesMaximumSet();
}

main().catch(console.error);
