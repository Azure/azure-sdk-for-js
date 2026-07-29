// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all incident tasks.
 *
 * @summary gets all incident tasks.
 * x-ms-original-file: 2025-07-01-preview/incidents/IncidentTasks/IncidentTasks_List.json
 */
async function incidentTasksList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.incidentTasks.list(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await incidentTasksList();
}

main().catch(console.error);
