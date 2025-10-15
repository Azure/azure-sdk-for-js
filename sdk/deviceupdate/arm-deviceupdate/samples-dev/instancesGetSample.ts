// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns instance details for the given instance and account name.
 *
 * @summary Returns instance details for the given instance and account name.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/Instances/Instances_Get.json
 */

import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsListOfInstances(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const instanceName = "blue";
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.instances.get(resourceGroupName, accountName, instanceName);
  console.log(result);
}

async function main(): Promise<void> {
  await getsListOfInstances();
}

main().catch(console.error);
