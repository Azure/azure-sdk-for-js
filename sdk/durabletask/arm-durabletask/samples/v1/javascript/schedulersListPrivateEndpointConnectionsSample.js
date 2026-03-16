// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private endpoint connections for the durable task scheduler
 *
 * @summary list private endpoint connections for the durable task scheduler
 * x-ms-original-file: 2026-02-01/PrivateEndpointConnections_List_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "851A7597-D699-45CC-899B-7487A5B3B775";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schedulers.listPrivateEndpointConnections(
    "rgdurabletask",
    "testscheduler",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionsListMaximumSet();
}

main().catch(console.error);
