// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection with a given name.
 *
 * @summary deletes a private endpoint connection with a given name.
 * x-ms-original-file: 2023-06-01-preview/PrivateEndpointConnectionDelete.json
 */
async function deletesAPrivateEndpointConnectionWithAGivenName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "private-endpoint-connection-name",
  );
}

async function main(): Promise<void> {
  await deletesAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
