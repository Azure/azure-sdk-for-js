// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified device capacity info.
 *
 * @summary gets the properties of the specified device capacity info.
 * x-ms-original-file: 2023-12-01/DeviceCapacityGet.json
 */
async function deviceCapacityGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.deviceCapacityInfo.getDeviceCapacityInfo(
    "GroupForEdgeAutomation",
    "testedgedevice",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deviceCapacityGet();
}

main().catch(console.error);
