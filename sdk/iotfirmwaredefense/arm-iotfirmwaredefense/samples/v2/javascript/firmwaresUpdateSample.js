// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update firmware.
 *
 * @summary the operation to update firmware.
 * x-ms-original-file: 2025-08-02/Firmwares_Update_MaximumSet_Gen.json
 */
async function firmwaresUpdateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.update(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "00000000-0000-0000-0000-000000000000",
    {
      properties: {
        fileName: "FileNameThatWasUploaded.bin",
        vendor: "ExampleVendorName",
        model: "ExampleModelOfDevice",
        version: "1.0.0",
        fileSize: 30,
        status: "Pending",
        statusMessages: [
          {
            errorCode: 5,
            message:
              "Firmware image contained some file systems that are not supported for extraction so results may be incomplete.",
          },
        ],
        description: "User provided description of the firmware.",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update firmware.
 *
 * @summary the operation to update firmware.
 * x-ms-original-file: 2025-08-02/Firmwares_Update_MinimumSet_Gen.json
 */
async function firmwaresUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwares.update("rgworkspaces-firmwares", "A7", "umrkdttp", {});
  console.log(result);
}

async function main() {
  await firmwaresUpdateMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresUpdateMinimumSetGen();
}

main().catch(console.error);
