// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a firmware.
 *
 * @summary the operation to delete a firmware.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_Delete_MaximumSet_Gen.json
 */
async function firmwaresDeleteMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  await client.firmwares.delete(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
  );
}

/**
 * This sample demonstrates how to the operation to delete a firmware.
 *
 * @summary the operation to delete a firmware.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_Delete_MinimumSet_Gen.json
 */
async function firmwaresDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "685C0C6F-9867-4B1C-A534-AA3A05B54BCE";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  await client.firmwares.delete("rgworkspaces-firmwares", "A7", "umrkdttp");
}

async function main() {
  await firmwaresDeleteMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresDeleteMinimumSetGen();
}

main().catch(console.error);
