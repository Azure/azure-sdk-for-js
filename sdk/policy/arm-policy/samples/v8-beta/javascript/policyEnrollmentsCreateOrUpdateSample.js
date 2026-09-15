// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy enrollment with the given scope and name. Policy enrollments apply to all resources contained within their scope. For example, when you create a policy enrollment at resource group scope for a policy assignment at the same or above level, the enrollment applies to all applicable resources in the resource group.
 *
 * @summary this operation creates or updates a policy enrollment with the given scope and name. Policy enrollments apply to all resources contained within their scope. For example, when you create a policy enrollment at resource group scope for a policy assignment at the same or above level, the enrollment applies to all applicable resources in the resource group.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdatePolicyEnrollment.json
 */
async function createOrUpdateAPolicyEnrollment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyEnrollments.createOrUpdate(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    {
      policyAssignmentId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyAssignments/CostManagement",
      policyDefinitionReferenceIds: ["Limit_Skus"],
      displayName: "Enroll demo cluster",
      description: "Enroll demo cluster from limit sku",
      metadata: { reason: "Enrollment for a expensive VM demo" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy enrollment with the given scope and name. Policy enrollments apply to all resources contained within their scope. For example, when you create a policy enrollment at resource group scope for a policy assignment at the same or above level, the enrollment applies to all applicable resources in the resource group.
 *
 * @summary this operation creates or updates a policy enrollment with the given scope and name. Policy enrollments apply to all resources contained within their scope. For example, when you create a policy enrollment at resource group scope for a policy assignment at the same or above level, the enrollment applies to all applicable resources in the resource group.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdatePolicyEnrollmentWithResourceSelectors.json
 */
async function createOrUpdateAPolicyEnrollmentWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyEnrollments.createOrUpdate(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    {
      policyAssignmentId:
        "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/policyAssignments/CostManagement",
      policyDefinitionReferenceIds: ["Limit_Skus"],
      displayName: "Enroll demo cluster",
      description: "Enroll demo cluster from limit sku",
      metadata: { reason: "Enrollment for a expensive VM demo" },
      assignmentScopeValidation: "Default",
      resourceSelectors: [
        {
          name: "SDPRegions",
          selectors: [{ kind: "resourceLocation", in: ["eastus2euap", "centraluseuap"] }],
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicyEnrollment();
  await createOrUpdateAPolicyEnrollmentWithResourceSelectors();
}

main().catch(console.error);
