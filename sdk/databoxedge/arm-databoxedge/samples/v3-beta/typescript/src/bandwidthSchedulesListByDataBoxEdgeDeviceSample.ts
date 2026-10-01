// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
 *
 * @summary gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/BandwidthScheduleGetAllInDevice.json
 */
async function bandwidthScheduleGetAllInDevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bandwidthSchedules.listByDataBoxEdgeDevice(
    "testedgedevice",
    "GroupForEdgeAutomation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await bandwidthScheduleGetAllInDevice();
}

main().catch(console.error);
