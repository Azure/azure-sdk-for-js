// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists goal resources under a goal assignment.
 *
 * @summary lists goal resources under a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalResources_List_MaximumSet_Gen.json
 */
async function goalResourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalResources.list("production-sg", "zonal-resiliency-goal", {
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
