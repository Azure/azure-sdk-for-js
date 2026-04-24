// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a private endpoint connection for the durable task scheduler
 *
 * @summary create or update a private endpoint connection for the durable task scheduler
 * x-ms-original-file: 2026-02-01/PrivateEndpointConnections_Create_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "851A7597-D699-45CC-899B-7487A5B3B775";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.createOrUpdatePrivateEndpointConnection(
    "rgdurabletask",
    "testscheduler",
    "spzckqrbhfnabu",
    {
      properties: {
        privateEndpoint: {},
        privateLinkServiceConnectionState: {
          status: "Pending",
          actionsRequired: "mxymqfbbmpwjxsroldlsd",
          description: "ujdcsoyxljivwsgfkexhotaxcmzq",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsCreateMaximumSet();
}

main().catch(console.error);
