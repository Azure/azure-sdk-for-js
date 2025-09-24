// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Datastore resources by Cluster
 *
 * @summary list Datastore resources by Cluster
 * x-ms-original-file: 2024-09-01/Datastores_List.json
 */
async function datastoresList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.datastores.list("group1", "cloud1", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await datastoresList();
}

main().catch(console.error);
