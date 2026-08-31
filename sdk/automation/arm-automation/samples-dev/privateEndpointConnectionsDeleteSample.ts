// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection with a given name.
 *
 * @summary deletes a private endpoint connection with a given name.
 * x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionDelete.json
 */
async function deletesAPrivateEndpointConnectionWithAGivenName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AutomationClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rg1",
    "automationAccountName",
    "privateEndpointConnectionName",
  );
}

async function main(): Promise<void> {
  await deletesAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
