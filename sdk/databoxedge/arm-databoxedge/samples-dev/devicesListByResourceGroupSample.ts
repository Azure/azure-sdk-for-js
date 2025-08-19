// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the Data Box Edge/Data Box Gateway devices in a resource group.
 *
 * @summary Gets all the Data Box Edge/Data Box Gateway devices in a resource group.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/DataBoxEdgeDeviceGetByResourceGroup.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function dataBoxEdgeDeviceGetByResourceGroup(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devices.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

dataBoxEdgeDeviceGetByResourceGroup().catch(console.error);
