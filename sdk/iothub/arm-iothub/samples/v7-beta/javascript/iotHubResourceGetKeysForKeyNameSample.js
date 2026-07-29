// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a shared access policy by name from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security.
 *
 * @summary get a shared access policy by name from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security.
 * x-ms-original-file: 2026-03-01-preview/iothub_getkey.json
 */
async function iotHubResourceGetKeysForKeyName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.getKeysForKeyName(
    "myResourceGroup",
    "testHub",
    "iothubowner",
  );
  console.log(result);
}

async function main() {
  await iotHubResourceGetKeysForKeyName();
}

main().catch(console.error);
