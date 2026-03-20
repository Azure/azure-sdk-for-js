// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all private endpoint connections under a topic, domain, or partner namespace or namespace.
 *
 * @summary get all private endpoint connections under a topic, domain, or partner namespace or namespace.
 * x-ms-original-file: 2025-07-15-preview/PrivateEndpointConnections_ListByResource.json
 */
async function privateEndpointConnectionsListByResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByResource(
    "examplerg",
    "topics",
    "exampletopic1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionsListByResource();
}

main().catch(console.error);
