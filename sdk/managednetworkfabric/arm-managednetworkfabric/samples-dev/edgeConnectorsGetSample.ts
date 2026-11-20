// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified EdgeConnector.
 *
 * @summary gets the specified EdgeConnector.
 * x-ms-original-file: 2026-01-15-preview/EdgeConnectors_Get.json
 */
async function edgeConnectorsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.edgeConnectors.get("example-rg", "example-edgeConnector");
  console.log(result);
}

async function main(): Promise<void> {
  await edgeConnectorsGetMaximumSetGen();
}

main().catch(console.error);
