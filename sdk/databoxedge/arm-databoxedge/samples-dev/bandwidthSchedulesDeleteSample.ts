// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes the specified bandwidth schedule.
 *
 * @summary Deletes the specified bandwidth schedule.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/BandwidthScheduleDelete.json
 */
async function bandwidthScheduleDelete(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const name = "bandwidth-1";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.bandwidthSchedules.beginDeleteAndWait(
    deviceName,
    name,
    resourceGroupName,
  );
  console.log(result);
}

bandwidthScheduleDelete().catch(console.error);
