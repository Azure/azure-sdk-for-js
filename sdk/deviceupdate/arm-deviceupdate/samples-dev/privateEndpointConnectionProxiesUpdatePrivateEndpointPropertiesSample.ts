// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateEndpointUpdate } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to (INTERNAL - DO NOT USE) Updates a private endpoint inside the private endpoint connection proxy object.
 *
 * @summary (INTERNAL - DO NOT USE) Updates a private endpoint inside the private endpoint connection proxy object.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_PrivateEndpointUpdate.json
 */
async function privateEndpointConnectionProxyPrivateEndpointUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const privateEndpointConnectionProxyId = "peexample01";
  const privateEndpointUpdate: PrivateEndpointUpdate = {
    id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{peName}",
    immutableResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{peName}",
    immutableSubscriptionId: "00000000-0000-0000-0000-000000000000",
    location: "westus2",
    vnetTrafficTag: "12345678",
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.privateEndpointConnectionProxies.updatePrivateEndpointProperties(
    resourceGroupName,
    accountName,
    privateEndpointConnectionProxyId,
    privateEndpointUpdate,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionProxyPrivateEndpointUpdate();
}

main().catch(console.error);
