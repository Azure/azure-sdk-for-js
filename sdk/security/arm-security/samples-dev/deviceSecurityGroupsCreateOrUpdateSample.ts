// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to creates or updates the device security group on a specified IoT Hub resource.
 *
 * @summary use this method to creates or updates the device security group on a specified IoT Hub resource.
 * x-ms-original-file: 2019-08-01/DeviceSecurityGroups/PutDeviceSecurityGroups_example.json
 */
async function createOrUpdateADeviceSecurityGroupForTheSpecifiedIoTHubResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.deviceSecurityGroups.createOrUpdate(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Devices/iotHubs/sampleiothub",
    "samplesecuritygroup",
    {
      timeWindowRules: [
        {
          isEnabled: true,
          maxThreshold: 30,
          minThreshold: 0,
          ruleType: "ActiveConnectionsNotInAllowedRange",
          timeWindowSize: "PT05M",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateADeviceSecurityGroupForTheSpecifiedIoTHubResource();
}

main().catch(console.error);
