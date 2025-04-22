// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get firmware.
 *
 * @summary get firmware.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_Get_MaximumSet_Gen.json
 */
async function firmwaresGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.get(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get firmware.
 *
 * @summary get firmware.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_Get_MinimumSet_Gen.json
 */
async function firmwaresGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "685C0C6F-9867-4B1C-A534-AA3A05B54BCE";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.get("rgworkspaces-firmwares", "A7", "umrkdttp");
  console.log(result);
}

async function main(): Promise<void> {
  await firmwaresGetMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresGetMinimumSetGen();
}

main().catch(console.error);
