// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an IoT Central application.
 *
 * @summary Delete an IoT Central application.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_Delete.json
 */

import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function appsDelete(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "resRg";
  const resourceName = "myIoTCentralApp";
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const result = await client.apps.beginDeleteAndWait(resourceGroupName, resourceName);
  console.log(result);
}

appsDelete().catch(console.error);
