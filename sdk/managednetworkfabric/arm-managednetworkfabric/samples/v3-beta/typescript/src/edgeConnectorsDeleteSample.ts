// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified EdgeConnector.
 *
 * @summary deletes the specified EdgeConnector.
 * x-ms-original-file: 2026-01-15-preview/EdgeConnectors_Delete.json
 */
async function edgeConnectorsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.edgeConnectors.delete("example-rg", "example-edgeConnector");
}

async function main(): Promise<void> {
  await edgeConnectorsDeleteMaximumSetGen();
}

main().catch(console.error);
