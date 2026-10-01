// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes a standard assignment, given its name and the scope it was created in. The scope of a standard assignment is the part of its ID preceding '/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}'.
 *
 * @summary this operation deletes a standard assignment, given its name and the scope it was created in. The scope of a standard assignment is the part of its ID preceding '/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}'.
 * x-ms-original-file: 2024-08-01/StandardAssignments/DeleteStandardAssignment.json
 */
async function deleteAStandardAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.standardAssignments.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

async function main(): Promise<void> {
  await deleteAStandardAssignment();
}

main().catch(console.error);
