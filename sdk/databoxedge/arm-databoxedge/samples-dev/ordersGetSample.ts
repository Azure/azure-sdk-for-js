// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a specific order by name.
 *
 * @summary Gets a specific order by name.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/OrderGet.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function orderGet(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.orders.get(deviceName, resourceGroupName);
  console.log(result);
}

orderGet().catch(console.error);
