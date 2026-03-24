// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all incidents.
 *
 * @summary gets all incidents.
 * x-ms-original-file: 2025-07-01-preview/incidents/Incidents_List.json
 */
async function incidentsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.incidents.list("myRg", "myWorkspace", {
    orderby: "properties/createdTimeUtc desc",
    top: 1,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await incidentsList();
}

main().catch(console.error);
