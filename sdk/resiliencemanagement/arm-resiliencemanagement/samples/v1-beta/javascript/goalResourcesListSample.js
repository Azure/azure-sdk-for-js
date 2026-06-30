// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list GoalResource resources by GoalAssignment
 *
 * @summary list GoalResource resources by GoalAssignment
 * x-ms-original-file: 2026-04-01-preview/GoalResources_List_MaximumSet_Gen.json
 */
async function goalResourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalResources.list("sg1", "ga1", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await goalResourcesListMaximumSet();
}

main().catch(console.error);
