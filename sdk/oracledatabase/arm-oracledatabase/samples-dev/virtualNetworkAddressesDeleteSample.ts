// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a VirtualNetworkAddress
 *
 * @summary delete a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_Delete_MaximumSet_Gen.json
 */
async function deleteVirtualNetworkAddressGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.virtualNetworkAddresses.delete(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
}

/**
 * This sample demonstrates how to delete a VirtualNetworkAddress
 *
 * @summary delete a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_Delete_MinimumSet_Gen.json
 */
async function deleteVirtualNetworkAddressGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.virtualNetworkAddresses.delete(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
}

/**
 * This sample demonstrates how to delete a VirtualNetworkAddress
 *
 * @summary delete a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/virtualNetworkAddresses_delete.json
 */
async function virtualNetworkAddressesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.virtualNetworkAddresses.delete("rg000", "cluster1", "hostname1");
}

async function main(): Promise<void> {
  await deleteVirtualNetworkAddressGeneratedByMaximumSetRule();
  await deleteVirtualNetworkAddressGeneratedByMinimumSetRule();
  await virtualNetworkAddressesDelete();
}

main().catch(console.error);
