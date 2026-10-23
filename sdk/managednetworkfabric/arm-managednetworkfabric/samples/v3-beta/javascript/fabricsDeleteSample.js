// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Fabric.
 *
 * @summary deletes the specified Fabric.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_Delete.json
 */
async function fabricsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.fabrics.delete("example-rg", "example-fabric");
}

async function main() {
  await fabricsDeleteMaximumSetGen();
}

main().catch(console.error);
