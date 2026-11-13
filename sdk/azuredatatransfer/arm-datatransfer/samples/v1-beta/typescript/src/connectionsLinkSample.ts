// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to links the connection to its pending connection.
 *
 * @summary links the connection to its pending connection.
 * x-ms-original-file: 2026-02-06-preview/linkConnection.json
 */
async function linksTheSpecifiedConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.connections.link("testRG", "testConnection", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await linksTheSpecifiedConnection();
}

main().catch(console.error);
