// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an analysis result summary of a firmware by name.
 *
 * @summary get an analysis result summary of a firmware by name.
 * x-ms-original-file: 2025-04-01-preview/Summaries_Get_MaximumSet_Gen.json
 */
async function summariesGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.summaries.get(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
    "Firmware",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get an analysis result summary of a firmware by name.
 *
 * @summary get an analysis result summary of a firmware by name.
 * x-ms-original-file: 2025-04-01-preview/Summaries_Get_MinimumSet_Gen.json
 */
async function summariesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.summaries.get(
    "FirmwareAnalysisRG",
    "default",
    "109a9886-50bf-85a8-9d75-000000000000",
    "Firmware",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summariesGetMaximumSetGenGeneratedByMaximumSetRule();
  await summariesGetMinimumSetGen();
}

main().catch(console.error);
