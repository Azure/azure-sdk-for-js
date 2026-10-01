// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionGet.json
 */
async function getsPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rg1",
    "automationAccountName",
    "privateEndpointConnectionName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
