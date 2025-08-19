// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
 *
 * @summary Gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/BandwidthScheduleGetAllInDevice.json
 */
async function bandwidthScheduleGetAllInDevice(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bandwidthSchedules.listByDataBoxEdgeDevice(
    deviceName,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

bandwidthScheduleGetAllInDevice().catch(console.error);
