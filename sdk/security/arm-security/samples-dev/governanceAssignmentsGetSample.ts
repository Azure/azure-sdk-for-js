// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a specific governanceAssignment for the requested scope by AssignmentKey
 *
 * @summary Get a specific governanceAssignment for the requested scope by AssignmentKey
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceAssignments/GetGovernanceAssignment_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getGovernanceAssignmentBySpecificGovernanceAssignmentKey(): Promise<void> {
  const scope =
    "subscriptions/c32e05d9-7207-4e22-bdf4-4f7d9c72e5fd/resourceGroups/compute_servers/providers/Microsoft.Compute/virtualMachines/win2012";
  const assessmentName = "6b9421dd-5555-2251-9b3d-2be58e2f82cd";
  const assignmentKey = "6634ff9f-127b-4bf2-8e6e-b1737f5e789c";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceAssignments.get(scope, assessmentName, assignmentKey);
  console.log(result);
}

async function main(): Promise<void> {
  await getGovernanceAssignmentBySpecificGovernanceAssignmentKey();
}

main().catch(console.error);
