// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the client groups under a namespace.
 *
 * @summary get all the client groups under a namespace.
 * x-ms-original-file: 2025-07-15-preview/ClientGroups_ListByNamespace.json
 */
async function clientGroupsListByNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clientGroups.listByNamespace("examplerg", "namespace123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clientGroupsListByNamespace();
}

main().catch(console.error);
