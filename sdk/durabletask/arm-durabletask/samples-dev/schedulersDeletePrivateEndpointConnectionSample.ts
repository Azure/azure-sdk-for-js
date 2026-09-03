// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a private endpoint connection for the durable task scheduler
 *
 * @summary delete a private endpoint connection for the durable task scheduler
 * x-ms-original-file: 2026-02-01/PrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "851A7597-D699-45CC-899B-7487A5B3B775";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.schedulers.deletePrivateEndpointConnection(
    "rgdurabletask",
    "testscheduler",
    "spzckqrbhfnabu",
  );
}

async function main(): Promise<void> {
  await privateEndpointConnectionsDeleteMaximumSet();
}

main().catch(console.error);
