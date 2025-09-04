// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists crypto key analysis results of a firmware.
 *
 * @summary lists crypto key analysis results of a firmware.
 * x-ms-original-file: 2025-08-02/CryptoKeys_ListByFirmware_MaximumSet_Gen.json
 */
async function cryptoKeysListByFirmwareMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cryptoKeys.listByFirmware(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists crypto key analysis results of a firmware.
 *
 * @summary lists crypto key analysis results of a firmware.
 * x-ms-original-file: 2025-08-02/CryptoKeys_ListByFirmware_MinimumSet_Gen.json
 */
async function cryptoKeysListByFirmwareMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cryptoKeys.listByFirmware(
    "FirmwareAnalysisRG",
    "default",
    "00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cryptoKeysListByFirmwareMaximumSetGenGeneratedByMaximumSetRule();
  await cryptoKeysListByFirmwareMinimumSetGen();
}

main().catch(console.error);
