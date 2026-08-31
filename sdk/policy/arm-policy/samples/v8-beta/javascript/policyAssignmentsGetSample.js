// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a single policy assignment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy assignment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyAssignment.json
 */
async function retrieveAPolicyAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation retrieves a single policy assignment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy assignment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyAssignmentWithIdentity.json
 */
async function retrieveAPolicyAssignmentWithASystemAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation retrieves a single policy assignment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy assignment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyAssignmentWithOverrides.json
 */
async function retrieveAPolicyAssignmentWithOverrides() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "CostManagement",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation retrieves a single policy assignment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy assignment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyAssignmentWithResourceSelectors.json
 */
async function retrieveAPolicyAssignmentWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "CostManagement",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation retrieves a single policy assignment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy assignment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyAssignmentWithUserAssignedIdentity.json
 */
async function retrieveAPolicyAssignmentWithAUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyAssignments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2",
    "EnforceNaming",
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicyAssignment();
  await retrieveAPolicyAssignmentWithASystemAssignedIdentity();
  await retrieveAPolicyAssignmentWithOverrides();
  await retrieveAPolicyAssignmentWithResourceSelectors();
  await retrieveAPolicyAssignmentWithAUserAssignedIdentity();
}

main().catch(console.error);
