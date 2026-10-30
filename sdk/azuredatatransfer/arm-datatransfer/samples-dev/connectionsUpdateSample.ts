// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the connection resource.
 *
 * @summary updates the connection resource.
 * x-ms-original-file: 2026-02-06-preview/patchConnection.json
 */
async function updatesTheConnectionResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.connections.update("testRG", "testConnection", {});
}

async function main(): Promise<void> {
  await updatesTheConnectionResource();
}

main().catch(console.error);
