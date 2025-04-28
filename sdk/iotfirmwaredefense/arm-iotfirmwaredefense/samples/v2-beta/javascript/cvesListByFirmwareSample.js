// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists CVE analysis results of a firmware.
 *
 * @summary lists CVE analysis results of a firmware.
 * x-ms-original-file: 2025-04-01-preview/Cves_ListByFirmware_MaximumSet_Gen.json
 */
async function cvesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cves.listByFirmware(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists CVE analysis results of a firmware.
 *
 * @summary lists CVE analysis results of a firmware.
 * x-ms-original-file: 2025-04-01-preview/Cves_ListByFirmware_MinimumSet_Gen.json
 */
async function cvesListByFirmwareMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cves.listByFirmware(
    "FirmwareAnalysisRG",
    "default",
    "109a9886-50bf-85a8-9d75-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cvesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule();
  await cvesListByFirmwareMinimumSetGen();
}

main().catch(console.error);
