// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a StorageAccount by name.
 *
 * @summary Gets a StorageAccount by name.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2019-08-01/examples/StorageAccountGet.json
 */
async function storageAccountGet(): Promise<void> {
  const subscriptionId =
    process.env["DATABOXEDGE_SUBSCRIPTION_ID"] || "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const storageAccountName = "blobstorageaccount1";
  const resourceGroupName = process.env["DATABOXEDGE_RESOURCE_GROUP"] || "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.get(
    deviceName,
    storageAccountName,
    resourceGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGet();
}

main().catch(console.error);
