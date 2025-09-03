// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists crypto certificate analysis results of a firmware.
 *
 * @summary lists crypto certificate analysis results of a firmware.
 * x-ms-original-file: 2025-08-02/CryptoCertificates_ListByFirmware_MaximumSet_Gen.json
 */
async function cryptoCertificatesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cryptoCertificates.listByFirmware(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists crypto certificate analysis results of a firmware.
 *
 * @summary lists crypto certificate analysis results of a firmware.
 * x-ms-original-file: 2025-08-02/CryptoCertificates_ListByFirmware_MinimumSet_Gen.json
 */
async function cryptoCertificatesListByFirmwareMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cryptoCertificates.listByFirmware(
    "FirmwareAnalysisRG",
    "default",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cryptoCertificatesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule();
  await cryptoCertificatesListByFirmwareMinimumSetGen();
}

main().catch(console.error);
