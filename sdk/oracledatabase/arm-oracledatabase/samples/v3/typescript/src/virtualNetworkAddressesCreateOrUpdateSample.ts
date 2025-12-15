// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a VirtualNetworkAddress
 *
 * @summary create a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createVirtualNetworkAddressGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAddresses.createOrUpdate(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
    {
      properties: {
        ipAddress: "192.168.0.1",
        vmOcid: "ocid1..aaaa",
        ocid: "ocid1..aaaaaa",
        lifecycleState: "Available",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a VirtualNetworkAddress
 *
 * @summary create a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_CreateOrUpdate_MinimumSet_Gen.json
 */
async function createVirtualNetworkAddressGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAddresses.createOrUpdate(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
    {},
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a VirtualNetworkAddress
 *
 * @summary create a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/virtualNetworkAddresses_create.json
 */
async function virtualNetworkAddressesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAddresses.createOrUpdate(
    "rg000",
    "cluster1",
    "hostname1",
    { properties: { ipAddress: "192.168.0.1", vmOcid: "ocid1..aaaa" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkAddressGeneratedByMaximumSetRule();
  await createVirtualNetworkAddressGeneratedByMinimumSetRule();
  await virtualNetworkAddressesCreateOrUpdate();
}

main().catch(console.error);
