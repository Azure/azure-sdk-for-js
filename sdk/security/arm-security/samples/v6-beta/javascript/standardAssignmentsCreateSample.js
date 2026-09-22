// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a standard assignment with the given scope and name. standard assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a standard assignment with the given scope and name. standard assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2024-08-01/StandardAssignments/PutExemptionStandardAssignment.json
 */
async function putExemptionStandardAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.standardAssignments.create(
    "subscriptions/212f9889-769e-45ae-ab43-6da33674bd26/resourceGroups/ANAT_TEST_RG/providers/Microsoft.Compute/virtualMachines/anatTestE2LA",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
    {
      description: "Exemption description",
      assignedStandard: {
        id: "/providers/Microsoft.Security/securityStandards/1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
      },
      displayName: "Test exemption",
      effect: "Exempt",
      exemptionData: {
        assignedAssessment: { assessmentKey: "1195afff-c881-495e-9bc5-1486211ae03f" },
        exemptionCategory: "waiver",
      },
      expiresOn: new Date("2022-05-01T19:50:47.083633Z"),
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a standard assignment with the given scope and name. standard assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @summary this operation creates or updates a standard assignment with the given scope and name. standard assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 * x-ms-original-file: 2024-08-01/StandardAssignments/PutStandardAssignment.json
 */
async function putAnAuditStandardAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.standardAssignments.create(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
    {
      description: "Set of policies monitored by Azure Security Center for cross cloud",
      assignedStandard: {
        id: "/providers/Microsoft.Security/securityStandards/1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
      },
      displayName: "ASC Default",
      effect: "Audit",
      excludedScopes: [],
    },
  );
  console.log(result);
}

async function main() {
  await putExemptionStandardAssignment();
  await putAnAuditStandardAssignment();
}

main().catch(console.error);
