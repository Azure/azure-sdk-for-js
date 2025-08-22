// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Get all IoT Central Applications in a subscription.
 *
 * @summary Get all IoT Central Applications in a subscription.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_ListBySubscription.json
 */
import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function appsListBySubscription(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apps.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

appsListBySubscription().catch(console.error);
