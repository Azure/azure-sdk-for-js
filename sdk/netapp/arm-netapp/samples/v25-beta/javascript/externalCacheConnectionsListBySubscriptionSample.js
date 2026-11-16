// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all External Cache Connections in the subscription
 *
 * @summary list all External Cache Connections in the subscription
 * x-ms-original-file: 2026-08-15-preview/ExternalCacheConnections_ListBySubscription.json
 */
async function externalCacheConnectionsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalCacheConnections.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await externalCacheConnectionsListBySubscription();
}

main().catch(console.error);
