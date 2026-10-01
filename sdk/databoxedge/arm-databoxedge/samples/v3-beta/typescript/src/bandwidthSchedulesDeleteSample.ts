// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified bandwidth schedule.
 *
 * @summary deletes the specified bandwidth schedule.
 * x-ms-original-file: 2023-12-01/BandwidthScheduleDelete.json
 */
async function bandwidthScheduleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.bandwidthSchedules.delete("testedgedevice", "bandwidth-1", "GroupForEdgeAutomation");
}

async function main(): Promise<void> {
  await bandwidthScheduleDelete();
}

main().catch(console.error);
