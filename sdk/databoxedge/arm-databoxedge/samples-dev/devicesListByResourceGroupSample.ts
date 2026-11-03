// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the Data Box Edge/Data Box Gateway devices in a resource group.
 *
 * @summary gets all the Data Box Edge/Data Box Gateway devices in a resource group.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDeviceGetByResourceGroup.json
 */
async function dataBoxEdgeDeviceGetByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devices.listByResourceGroup("GroupForEdgeAutomation")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dataBoxEdgeDeviceGetByResourceGroup();
}

main().catch(console.error);
