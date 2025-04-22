// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update firmware.
 *
 * @summary the operation to update firmware.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_Update_MaximumSet_Gen.json
 */
async function firmwaresUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.update(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
    {
      properties: {
        fileName: "dmnqhyxssutvnewntlb",
        vendor: "hymojocxpxqhtblioaavylnzyg",
        model: "wmyfbyjsggbvxcuin",
        version: "nhtxzslgcbtptu",
        fileSize: 30,
        status: "Pending",
        statusMessages: [{ errorCode: 20, message: "edtylkjvj" }],
        description: "nknvqnkgumzbupxe",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update firmware.
 *
 * @summary the operation to update firmware.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_Update_MinimumSet_Gen.json
 */
async function firmwaresUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "685C0C6F-9867-4B1C-A534-AA3A05B54BCE";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.update("rgworkspaces-firmwares", "A7", "umrkdttp", {});
  console.log(result);
}

async function main(): Promise<void> {
  await firmwaresUpdateMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresUpdateMinimumSetGen();
}

main().catch(console.error);
