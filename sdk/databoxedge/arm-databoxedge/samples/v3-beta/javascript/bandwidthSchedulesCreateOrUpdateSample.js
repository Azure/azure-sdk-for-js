// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a bandwidth schedule.
 *
 * @summary creates or updates a bandwidth schedule.
 * x-ms-original-file: 2023-12-01/BandwidthSchedulePut.json
 */
async function bandwidthSchedulePut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.bandwidthSchedules.createOrUpdate(
    "testedgedevice",
    "bandwidth-1",
    "GroupForEdgeAutomation",
    { days: ["Sunday", "Monday"], rateInMbps: 100, start: "0:0:0", stop: "13:59:0" },
  );
  console.log(result);
}

async function main() {
  await bandwidthSchedulePut();
}

main().catch(console.error);
