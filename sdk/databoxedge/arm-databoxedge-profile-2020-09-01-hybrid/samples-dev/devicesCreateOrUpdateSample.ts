// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a Data Box Edge/Data Box Gateway resource.
 *
 * @summary Creates or updates a Data Box Edge/Data Box Gateway resource.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2019-08-01/examples/DataBoxEdgeDevicePut.json
 */

import type { DataBoxEdgeDevice } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dataBoxEdgeDevicePut(): Promise<void> {
  const subscriptionId =
    process.env["DATABOXEDGE_SUBSCRIPTION_ID"] || "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = process.env["DATABOXEDGE_RESOURCE_GROUP"] || "GroupForEdgeAutomation";
  const dataBoxEdgeDevice: DataBoxEdgeDevice = {
    location: "eastus",
    sku: { name: "Edge", tier: "Standard" },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.beginCreateOrUpdateAndWait(
    deviceName,
    resourceGroupName,
    dataBoxEdgeDevice,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataBoxEdgeDevicePut();
}

main().catch(console.error);
