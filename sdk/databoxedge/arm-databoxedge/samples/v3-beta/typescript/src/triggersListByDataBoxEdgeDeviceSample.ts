// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the triggers configured in the device.
 *
 * @summary lists all the triggers configured in the device.
 * x-ms-original-file: 2023-12-01/TriggerGetAllInDevice.json
 */
async function triggerGetAllInDevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.triggers.listByDataBoxEdgeDevice(
    "testedgedevice",
    "GroupForEdgeAutomation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await triggerGetAllInDevice();
}

main().catch(console.error);
