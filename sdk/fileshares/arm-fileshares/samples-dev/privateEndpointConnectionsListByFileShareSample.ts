// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PrivateEndpointConnection List.
 *
 * @summary get a PrivateEndpointConnection List.
 * x-ms-original-file: 2026-06-01/PrivateEndpointConnections_ListByFileShare.json
 */
async function privateEndpointConnectionsListByFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByFileShare(
    "rgfileshares",
    "fileshare",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsListByFileShare();
}

main().catch(console.error);
