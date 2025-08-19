// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the StorageAccount on the Data Box Edge/Data Box Gateway device.
 *
 * @summary Deletes the StorageAccount on the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/StorageAccountDelete.json
 */

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function storageAccountDelete(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const storageAccountName = "storageaccount1";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.beginDeleteAndWait(
    deviceName,
    storageAccountName,
    resourceGroupName,
  );
  console.log(result);
}

storageAccountDelete().catch(console.error);
