// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network connection resource.
 *
 * @summary gets a network connection resource.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_Get.json
 */
async function networkConnectionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.get("rg1", "uswest3network");
  console.log(result);
}

async function main(): Promise<void> {
  await networkConnectionsGet();
}

main().catch(console.error);
