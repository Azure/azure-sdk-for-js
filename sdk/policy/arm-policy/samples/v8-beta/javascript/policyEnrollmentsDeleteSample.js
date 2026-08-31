// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes a policy enrollment, given its name and the scope it was created in. The scope of a policy enrollment is the part of its ID preceding '/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}'.
 *
 * @summary this operation deletes a policy enrollment, given its name and the scope it was created in. The scope of a policy enrollment is the part of its ID preceding '/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}'.
 * x-ms-original-file: 2026-01-01-preview/deletePolicyEnrollment.json
 */
async function deleteAPolicyEnrollment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policyEnrollments.delete(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
  );
}

async function main() {
  await deleteAPolicyEnrollment();
}

main().catch(console.error);
