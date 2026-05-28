// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a single standard assignment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single standard assignment, given its name and the scope it was created at.
 * x-ms-original-file: 2024-08-01/StandardAssignments/GetStandardAssignment.json
 */
async function retrieveAStandardAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.standardAssignments.get(
    "providers/Microsoft.Management/managementGroups/contoso",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

async function main() {
  await retrieveAStandardAssignment();
}

main().catch(console.error);
