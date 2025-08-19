// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes the addon on the device.
 *
 * @summary Deletes the addon on the device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/DeleteAddons.json
 */
async function deleteAddOns(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const roleName = "KubernetesRole";
  const addonName = "arcName";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.addons.beginDeleteAndWait(
    deviceName,
    roleName,
    addonName,
    resourceGroupName,
  );
  console.log(result);
}

deleteAddOns().catch(console.error);
