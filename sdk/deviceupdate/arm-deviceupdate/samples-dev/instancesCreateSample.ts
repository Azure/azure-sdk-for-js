// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates instance.
 *
 * @summary Creates or updates instance.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/Instances/Instances_Create.json
 */

import type { Instance } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createsOrUpdatesInstance(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const instanceName = "blue";
  const instance: Instance = {
    diagnosticStorageProperties: {
      authenticationType: "KeyBased",
      connectionString: "string",
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/adu-resource-group/providers/Microsoft.Storage/storageAccounts/testAccount",
    },
    enableDiagnostics: false,
    iotHubs: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Devices/IotHubs/blue-contoso-hub",
      },
    ],
    location: "westus2",
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.instances.beginCreateAndWait(
    resourceGroupName,
    accountName,
    instanceName,
    instance,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesInstance();
}

main().catch(console.error);
