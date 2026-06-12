// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific standard assignment for the requested scope by resourceId
 *
 * @summary get a specific standard assignment for the requested scope by resourceId
 * x-ms-original-file: 2021-08-01-preview/Assignments/GetAssignment_example.json
 */
async function getSecurityStandardAssignmentsByBySpecificStandardAssignmentId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assignments.get(
    "myResourceGroup",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

async function main() {
  await getSecurityStandardAssignmentsByBySpecificStandardAssignmentId();
}

main().catch(console.error);
