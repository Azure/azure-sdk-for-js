// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the connection resource.
 *
 * @summary deletes the connection resource.
 * x-ms-original-file: 2026-02-06-preview/deleteConnection.json
 */
async function deletesTheConnectionResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.connections.delete("testRG", "testConnection");
}

async function main(): Promise<void> {
  await deletesTheConnectionResource();
}

main().catch(console.error);
