// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Refreshes the container metadata with the data from the cloud.
 *
 * @summary Refreshes the container metadata with the data from the cloud.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/ContainerRefresh.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function containerRefresh(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const storageAccountName = "storageaccount1";
  const containerName = "blobcontainer1";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.containers.beginRefreshAndWait(
    deviceName,
    storageAccountName,
    containerName,
    resourceGroupName,
  );
  console.log(result);
}

containerRefresh().catch(console.error);
