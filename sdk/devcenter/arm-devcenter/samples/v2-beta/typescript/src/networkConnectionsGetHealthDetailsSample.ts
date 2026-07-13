// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets health check status details.
 *
 * @summary gets health check status details.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_GetHealthDetails.json
 */
async function networkConnectionsGetHealthDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.getHealthDetails("rg1", "eastusnetwork");
  console.log(result);
}

async function main(): Promise<void> {
  await networkConnectionsGetHealthDetails();
}

main().catch(console.error);
