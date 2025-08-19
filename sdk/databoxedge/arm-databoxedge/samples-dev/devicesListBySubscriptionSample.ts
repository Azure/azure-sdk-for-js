// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets all the Data Box Edge/Data Box Gateway devices in a subscription.
 *
 * @summary Gets all the Data Box Edge/Data Box Gateway devices in a subscription.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/DataBoxEdgeDeviceGetBySubscription.json
 */
async function dataBoxEdgeDeviceGetBySubscription(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devices.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

dataBoxEdgeDeviceGetBySubscription().catch(console.error);
