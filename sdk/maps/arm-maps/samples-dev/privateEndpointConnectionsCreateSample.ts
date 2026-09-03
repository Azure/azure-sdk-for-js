// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the state of specified private endpoint connection associated with the Maps account.
 *
 * @summary create or update the state of specified private endpoint connection associated with the Maps account.
 * x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_Update.json
 */
async function privateEndpointConnectionsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "myResourceGroup",
    "myMapsAccount",
    "privateEndpointConnectionName",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsCreate();
}

main().catch(console.error);
