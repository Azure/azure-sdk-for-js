// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the file share.
 *
 * @summary deletes the specified private endpoint connection associated with the file share.
 * x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Delete.json
 */
async function privateEndpointConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rgfileshares",
    "fileshare",
    "privateEndpointConnection1",
  );
}

async function main(): Promise<void> {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
