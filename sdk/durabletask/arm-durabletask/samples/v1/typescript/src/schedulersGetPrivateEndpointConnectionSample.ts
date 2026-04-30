// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a private endpoint connection for the durable task scheduler
 *
 * @summary get a private endpoint connection for the durable task scheduler
 * x-ms-original-file: 2026-02-01/PrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "851A7597-D699-45CC-899B-7487A5B3B775";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.getPrivateEndpointConnection(
    "rgdurabletask",
    "testscheduler",
    "spzckqrbhfnabu",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsGetMaximumSet();
}

main().catch(console.error);
