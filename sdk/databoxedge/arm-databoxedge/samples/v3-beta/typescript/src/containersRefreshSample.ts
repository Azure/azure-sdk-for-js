// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes the container metadata with the data from the cloud.
 *
 * @summary refreshes the container metadata with the data from the cloud.
 * x-ms-original-file: 2023-12-01/ContainerRefresh.json
 */
async function containerRefresh(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.containers.refresh(
    "testedgedevice",
    "storageaccount1",
    "blobcontainer1",
    "GroupForEdgeAutomation",
  );
}

async function main(): Promise<void> {
  await containerRefresh();
}

main().catch(console.error);
