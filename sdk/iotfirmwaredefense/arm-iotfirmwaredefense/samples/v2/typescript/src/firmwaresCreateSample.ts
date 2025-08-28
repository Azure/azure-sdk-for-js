// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create a firmware.
 *
 * @summary the operation to create a firmware.
 * x-ms-original-file: 2025-08-02/Firmwares_Create_MaximumSet_Gen.json
 */
async function firmwaresCreateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.create(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
    {
      properties: {
        fileName: "NameOfFirmwareFile.bin",
        vendor: "ExampleVendorName",
        model: "ExampleModelOfDevice",
        version: "1.0.0",
        fileSize: 30,
        status: "Pending",
        statusMessages: [{ errorCode: 200, message: "What would this message say?" }],
        description: "User provided description of the firmware.",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create a firmware.
 *
 * @summary the operation to create a firmware.
 * x-ms-original-file: 2025-08-02/Firmwares_Create_MinimumSet_Gen.json
 */
async function firmwaresCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.create("rgworkspaces-firmwares", "A7", "umrkdttp", {
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await firmwaresCreateMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresCreateMinimumSetGen();
}

main().catch(console.error);
