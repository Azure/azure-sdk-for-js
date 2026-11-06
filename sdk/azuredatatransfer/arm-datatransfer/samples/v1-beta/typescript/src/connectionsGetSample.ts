// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets connection resource.
 *
 * @summary gets connection resource.
 * x-ms-original-file: 2026-02-06-preview/getConnection.json
 */
async function getsConnectionResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.connections.get("testRG", "testConnection");
  console.log(result);
}

async function main(): Promise<void> {
  await getsConnectionResource();
}

main().catch(console.error);
