// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all relevant standardAssignments over a subscription level scope
 *
 * @summary get a list of all relevant standardAssignments over a subscription level scope
 * x-ms-original-file: 2021-08-01-preview/Assignments/ListBySubscriptionAssignments_example.json
 */
async function listSecurityStandardAssignmentsBySubscriptionLevelScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.assignments.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityStandardAssignmentsBySubscriptionLevelScope();
}

main().catch(console.error);
