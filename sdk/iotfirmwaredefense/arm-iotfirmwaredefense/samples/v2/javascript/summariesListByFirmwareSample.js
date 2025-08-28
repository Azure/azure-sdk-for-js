// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name.
 *
 * @summary lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name.
 * x-ms-original-file: 2025-08-02/Summaries_ListByFirmware_MaximumSet_Gen.json
 */
async function summariesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.summaries.listByFirmware(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name.
 *
 * @summary lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name.
 * x-ms-original-file: 2025-08-02/Summaries_ListByFirmware_MinimumSet_Gen.json
 */
async function summariesListByFirmwareMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.summaries.listByFirmware(
    "FirmwareAnalysisRG",
    "default",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await summariesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule();
  await summariesListByFirmwareMinimumSetGen();
}

main().catch(console.error);
