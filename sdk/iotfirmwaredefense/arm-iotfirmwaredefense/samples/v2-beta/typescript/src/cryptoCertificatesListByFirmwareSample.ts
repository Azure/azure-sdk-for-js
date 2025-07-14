// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists crypto certificate analysis results of a firmware.
 *
 * @summary lists crypto certificate analysis results of a firmware.
 * x-ms-original-file: 2025-04-01-preview/CryptoCertificates_ListByFirmware_MaximumSet_Gen.json
 */
async function cryptoCertificatesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
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
 * x-ms-original-file: 2025-04-01-preview/CryptoCertificates_ListByFirmware_MinimumSet_Gen.json
 */
async function cryptoCertificatesListByFirmwareMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cryptoCertificates.listByFirmware(
    "FirmwareAnalysisRG",
    "default",
    "109a9886-50bf-85a8-9d75-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cryptoCertificatesListByFirmwareMaximumSetGenGeneratedByMaximumSetRule();
  await cryptoCertificatesListByFirmwareMinimumSetGen();
}

main().catch(console.error);
