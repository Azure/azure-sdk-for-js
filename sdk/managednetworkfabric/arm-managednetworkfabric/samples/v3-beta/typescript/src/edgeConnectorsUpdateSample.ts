// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an EdgeConnector.
 *
 * @summary updates an EdgeConnector.
 * x-ms-original-file: 2026-01-15-preview/EdgeConnectors_Update.json
 */
async function edgeConnectorsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.edgeConnectors.update("example-rg", "example-edgeConnector", {
    tags: { environment: "staging" },
    properties: { version: "1.1.0" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await edgeConnectorsUpdateMaximumSetGen();
}

main().catch(console.error);
