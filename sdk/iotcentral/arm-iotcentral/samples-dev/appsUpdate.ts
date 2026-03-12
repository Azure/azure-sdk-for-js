// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Update the metadata of an IoT Central application.
 *
 * @summary Update the metadata of an IoT Central application.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Update.json
 */
import type { AppPatch } from "@azure/arm-iotcentral";
import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function appsUpdate(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "resRg";
  const resourceName = "myIoTCentralApp";
  const appPatch: AppPatch = {
    displayName: "My IoT Central App 2",
    identity: { type: "SystemAssigned" },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const result = await client.apps.beginUpdateAndWait(resourceGroupName, resourceName, appPatch);
  console.log(result);
}

appsUpdate().catch(console.error);
