// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a bandwidth schedule.
 *
 * @summary Creates or updates a bandwidth schedule.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/BandwidthSchedulePut.json
 */

import type { BandwidthSchedule } from "@azure/arm-databoxedge";
import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function bandwidthSchedulePut(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const name = "bandwidth-1";
  const resourceGroupName = "GroupForEdgeAutomation";
  const parameters: BandwidthSchedule = {
    days: ["Sunday", "Monday"],
    rateInMbps: 100,
    start: "0:0:0",
    stop: "13:59:0",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.bandwidthSchedules.beginCreateOrUpdateAndWait(
    deviceName,
    name,
    resourceGroupName,
    parameters,
  );
  console.log(result);
}

bandwidthSchedulePut().catch(console.error);
