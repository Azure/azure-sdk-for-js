// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all relevant standard assignments over a scope
 *
 * @summary get a list of all relevant standard assignments over a scope
 * x-ms-original-file: 2024-08-01/StandardAssignments/ListStandardAssignments.json
 */
async function listStandardAssignments() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.standardAssignments.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listStandardAssignments();
}

main().catch(console.error);
