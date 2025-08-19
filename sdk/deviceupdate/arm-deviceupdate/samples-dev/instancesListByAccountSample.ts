// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns instances for the given account name.
 *
 * @summary Returns instances for the given account name.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/Instances/Instances_ListByAccount.json
 */
async function getsListOfInstancesByAccount(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instances.listByAccount(resourceGroupName, accountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfInstancesByAccount();
}

main().catch(console.error);
