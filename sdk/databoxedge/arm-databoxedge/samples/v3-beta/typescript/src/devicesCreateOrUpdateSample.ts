// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Data Box Edge/Data Box Gateway resource.
 *
 * @summary creates or updates a Data Box Edge/Data Box Gateway resource.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDevicePut.json
 */
async function dataBoxEdgeDevicePut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.createOrUpdate("testedgedevice", "GroupForEdgeAutomation", {
    location: "WUS",
    sku: { name: "Edge", tier: "Standard" },
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Data Box Edge/Data Box Gateway resource.
 *
 * @summary creates or updates a Data Box Edge/Data Box Gateway resource.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDevicePutWithDataResidency.json
 */
async function dataBoxEdgeDevicePutWithDataResidency(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.createOrUpdate("testedgedevice", "GroupForEdgeAutomation", {
    location: "WUS",
    dataResidency: { type: "ZoneReplication" },
    sku: { name: "Edge", tier: "Standard" },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dataBoxEdgeDevicePut();
  await dataBoxEdgeDevicePutWithDataResidency();
}

main().catch(console.error);
