// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an analysis result summary of a firmware by name.
 *
 * @summary get an analysis result summary of a firmware by name.
 * x-ms-original-file: 2025-08-02/Summaries_Get_MaximumSet_Gen.json
 */
async function summariesGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
 * x-ms-original-file: 2025-08-02/Summaries_Get_MinimumSet_Gen.json
 */
async function summariesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.summaries.get(
    "FirmwareAnalysisRG",
    "default",
    "00000000-0000-0000-0000-000000000000",
    "Firmware",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summariesGetMaximumSetGenGeneratedByMaximumSetRule();
  await summariesGetMinimumSetGen();
}

main().catch(console.error);
