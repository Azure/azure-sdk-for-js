// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a GovernanceAssignment over a given scope
 *
 * @summary delete a GovernanceAssignment over a given scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceAssignments/DeleteGovernanceAssignment_example.json
 */
async function deleteSecurityAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceAssignments.delete(
    "subscriptions/c32e05d9-7207-4e22-bdf4-4f7d9c72e5fd/resourceGroups/compute_servers/providers/Microsoft.Compute/virtualMachines/win2012",
    "6b9421dd-5555-2251-9b3d-2be58e2f82cd",
    "6634ff9f-127b-4bf2-8e6e-b1737f5e789c",
  );
}

async function main() {
  await deleteSecurityAssignment();
}

main().catch(console.error);
