// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements NetworkMonitor GET method.
 *
 * @summary implements NetworkMonitor GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkMonitors_Get.json
 */
async function networkMonitorsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkMonitors.get("example-rg", "example-monitor");
  console.log(result);
}

async function main(): Promise<void> {
  await networkMonitorsGetMaximumSet();
}

main().catch(console.error);
