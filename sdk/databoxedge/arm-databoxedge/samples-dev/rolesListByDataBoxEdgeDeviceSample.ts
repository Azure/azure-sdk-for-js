// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the roles configured in a Data Box Edge/Data Box Gateway device.
 *
 * @summary Lists all the roles configured in a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/RoleGetAllInDevice.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function roleGetAllInDevice(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roles.listByDataBoxEdgeDevice(deviceName, resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

roleGetAllInDevice().catch(console.error);
