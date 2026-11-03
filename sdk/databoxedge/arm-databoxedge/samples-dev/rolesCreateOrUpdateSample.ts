// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a role.
 *
 * @summary create or update a role.
 * x-ms-original-file: 2023-12-01/RolePut.json
 */
async function rolePut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.roles.createOrUpdate(
    "testedgedevice",
    "IoTRole1",
    "GroupForEdgeAutomation",
    {
      kind: "IOT",
      hostPlatform: "Linux",
      ioTDeviceDetails: {
        authentication: {
          symmetricKey: {
            connectionString: {
              encryptionAlgorithm: "AES256",
              encryptionCertThumbprint: "348586569999244",
              value:
                "Encrypted<<HostName=iothub.azure-devices.net;DeviceId=iotDevice;SharedAccessKey=2C750FscEas3JmQ8Bnui5yQWZPyml0/UiRt1bQwd8=>>",
            },
          },
        },
        deviceId: "iotdevice",
        ioTHostHub: "iothub.azure-devices.net",
      },
      ioTEdgeDeviceDetails: {
        authentication: {
          symmetricKey: {
            connectionString: {
              encryptionAlgorithm: "AES256",
              encryptionCertThumbprint: "1245475856069999244",
              value:
                "Encrypted<<HostName=iothub.azure-devices.net;DeviceId=iotEdge;SharedAccessKey=2C750FscEas3JmQ8Bnui5yQWZPyml0/UiRt1bQwd8=>>",
            },
          },
        },
        deviceId: "iotEdge",
        ioTHostHub: "iothub.azure-devices.net",
      },
      roleStatus: "Enabled",
      shareMappings: [],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await rolePut();
}

main().catch(console.error);
