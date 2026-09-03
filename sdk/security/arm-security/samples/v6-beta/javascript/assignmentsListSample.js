// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all relevant standardAssignments available for scope
 *
 * @summary get a list of all relevant standardAssignments available for scope
 * x-ms-original-file: 2021-08-01-preview/Assignments/ListAssignments_example.json
 */
async function listSecurityStandardAssignmentsBySubscriptionIdAndResourceGroupScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.assignments.list("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityStandardAssignmentsBySubscriptionIdAndResourceGroupScope();
}

main().catch(console.error);
