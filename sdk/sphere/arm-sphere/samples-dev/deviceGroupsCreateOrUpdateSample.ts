// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @summary create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 * x-ms-original-file: 2024-04-01/PutDeviceGroup.json
 */
async function deviceGroupsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.deviceGroups.createOrUpdate(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "MyDeviceGroup1",
    {
      properties: {
        description: "Description for MyDeviceGroup1",
        osFeedType: "Retail",
        updatePolicy: "UpdateAll",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deviceGroupsCreateOrUpdate();
}

main().catch(console.error);
