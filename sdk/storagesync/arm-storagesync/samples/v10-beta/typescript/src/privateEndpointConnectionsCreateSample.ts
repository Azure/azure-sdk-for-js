// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the storage sync service.
 *
 * @summary update the state of specified private endpoint connection associated with the storage sync service.
 * x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Create.json
 */
async function privateEndpointConnectionsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "res7687",
    "sss2527",
    "{privateEndpointConnectionName}",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsCreate();
}

main().catch(console.error);
