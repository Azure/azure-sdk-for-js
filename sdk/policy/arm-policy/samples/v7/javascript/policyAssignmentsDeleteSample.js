// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes a policy assignment, given its name and the scope it was created in. The scope of a policy assignment is the part of its ID preceding '/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}'.
 *
 * @summary this operation deletes a policy assignment, given its name and the scope it was created in. The scope of a policy assignment is the part of its ID preceding '/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}'.
 * x-ms-original-file: 2025-03-01/deletePolicyAssignment.json
 */
async function deleteAPolicyAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.delete(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
  );
  console.log(result);
}

async function main() {
  await deleteAPolicyAssignment();
}

main().catch(console.error);
