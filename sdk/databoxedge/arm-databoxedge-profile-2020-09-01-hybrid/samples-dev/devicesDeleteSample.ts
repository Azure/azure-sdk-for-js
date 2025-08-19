// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the Data Box Edge/Data Box Gateway device.
 *
 * @summary Deletes the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2019-08-01/examples/DataBoxEdgeDeviceDelete.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dataBoxEdgeDeviceDelete(): Promise<void> {
  const subscriptionId =
    process.env["DATABOXEDGE_SUBSCRIPTION_ID"] || "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = process.env["DATABOXEDGE_RESOURCE_GROUP"] || "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.beginDeleteAndWait(deviceName, resourceGroupName);
  console.log(result);
}

async function main(): Promise<void> {
  await dataBoxEdgeDeviceDelete();
}

main().catch(console.error);
