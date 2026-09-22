// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a private endpoint connection for the durable task scheduler
 *
 * @summary update a private endpoint connection for the durable task scheduler
 * x-ms-original-file: 2026-02-01/PrivateEndpointConnections_Update.json
 */
async function privateEndpointConnectionsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "851A7597-D699-45CC-899B-7487A5B3B775";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.updatePrivateEndpointConnection(
    "rgdurabletask",
    "testscheduler",
    "spzckqrbhfnabu",
    { properties: { privateLinkServiceConnectionState: { status: "Approved" } } },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsUpdate();
}

main().catch(console.error);
