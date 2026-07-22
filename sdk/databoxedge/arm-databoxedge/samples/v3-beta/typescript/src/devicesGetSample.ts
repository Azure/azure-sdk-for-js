// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the Data Box Edge/Data Box Gateway device.
 *
 * @summary gets the properties of the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDeviceGetByName.json
 */
async function dataBoxEdgeDeviceGetByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.get("testedgedevice", "GroupForEdgeAutomation");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the properties of the Data Box Edge/Data Box Gateway device.
 *
 * @summary gets the properties of the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDeviceGetByNameWithDataResidency.json
 */
async function dataBoxEdgeDeviceGetByNameWithDataResidency(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.get("testedgedevice", "GroupForEdgeAutomation");
  console.log(result);
}

async function main(): Promise<void> {
  await dataBoxEdgeDeviceGetByName();
  await dataBoxEdgeDeviceGetByNameWithDataResidency();
}

main().catch(console.error);
