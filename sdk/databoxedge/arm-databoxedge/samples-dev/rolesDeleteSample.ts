// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the role on the device.
 *
 * @summary Deletes the role on the device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/RoleDelete.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function roleDelete(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const name = "IoTRole1";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.roles.beginDeleteAndWait(deviceName, name, resourceGroupName);
  console.log(result);
}

roleDelete().catch(console.error);
