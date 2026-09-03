// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified bandwidth schedule.
 *
 * @summary gets the properties of the specified bandwidth schedule.
 * x-ms-original-file: 2023-12-01/BandwidthScheduleGet.json
 */
async function bandwidthScheduleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.bandwidthSchedules.get(
    "testedgedevice",
    "bandwidth-1",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bandwidthScheduleGet();
}

main().catch(console.error);
