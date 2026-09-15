// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a GoalAssignment
 *
 * @summary update a GoalAssignment
 * x-ms-original-file: 2026-09-30-preview/GoalAssignments_Update_MaximumSet_Gen.json
 */
async function goalAssignmentsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.update("sg1", "ga1", {
    properties: {
      serviceLevelResources: [
        {
          serviceLevelIndicatorResourceId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine",
        },
      ],
      requireZonalResiliency: true,
      requireRegionalResiliency: true,
      regionalObjectives: {
        targetRecoveryPointObjective: "PT15M",
        targetRecoveryTimeObjective: "PT1H",
      },
    },
  });
}

async function main() {
  await goalAssignmentsUpdateMaximumSet();
}

main().catch(console.error);
