// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to (INTERNAL - DO NOT USE) List all private endpoint connection proxies in a device update account.
 *
 * @summary (INTERNAL - DO NOT USE) List all private endpoint connection proxies in a device update account.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_ListByAccount.json
 */

import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionProxyList(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnectionProxies.listByAccount(
    resourceGroupName,
    accountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionProxyList();
}

main().catch(console.error);
