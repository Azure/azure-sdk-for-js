// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Network Connections resource.
 *
 * @summary deletes a Network Connections resource.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_Delete.json
 */
async function networkConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.networkConnections.delete("rg1", "eastusnetwork");
}

async function main(): Promise<void> {
  await networkConnectionsDelete();
}

main().catch(console.error);
