// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a GoalAssignment
 *
 * @summary create a GoalAssignment
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function goalAssignmentsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.createOrUpdate("sg1", "ga1", {
    properties: {
      goalTemplateId: "/providers/Microsoft.AzureResilienceManagement/goaltemplates/gt1",
      goalAssignmentType: "Resiliency",
      serviceLevelResources: [
        {
          serviceLevelIndicatorResourceId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine",
          serviceLevelObjectiveResourceId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/MyResourceGroup/providers/Microsoft.Compute/virtualMachines/MyVirtualMachine",
        },
      ],
    },
  });
}

/**
 * This sample demonstrates how to create a GoalAssignment
 *
 * @summary create a GoalAssignment
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_CreateOrUpdate_MinimumSet_Gen.json
 */
async function goalAssignmentsCreateOrUpdateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.createOrUpdate("sg1", "ga1", {
    properties: {
      goalTemplateId: "/providers/Microsoft.AzureResilienceManagement/goaltemplates/gt1",
      goalAssignmentType: "Resiliency",
    },
  });
}

async function main() {
  await goalAssignmentsCreateOrUpdateMaximumSet();
  await goalAssignmentsCreateOrUpdateMinimumSet();
}

main().catch(console.error);
