// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateEndpointConnectionProxy } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to (INTERNAL - DO NOT USE) Creates or updates the specified private endpoint connection proxy resource associated with the device update account.
 *
 * @summary (INTERNAL - DO NOT USE) Creates or updates the specified private endpoint connection proxy resource associated with the device update account.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_CreateOrUpdate.json
 */
async function privateEndpointConnectionProxyCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const privateEndpointConnectionProxyId = "peexample01";
  const privateEndpointConnectionProxy: PrivateEndpointConnectionProxy = {
    remotePrivateEndpoint: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{peName}",
      immutableResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{peName}",
      immutableSubscriptionId: "00000000-0000-0000-0000-000000000000",
      location: "westus2",
      manualPrivateLinkServiceConnections: [
        {
          name: "{privateEndpointConnectionProxyId}",
          groupIds: ["DeviceUpdate"],
          requestMessage: "Please approve my connection, thanks.",
        },
      ],
      privateLinkServiceProxies: [
        {
          groupConnectivityInformation: [],
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{privateEndpointConnectionProxyId}/privateLinkServiceProxies/{privateEndpointConnectionProxyId}",
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.privateEndpointConnectionProxies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    accountName,
    privateEndpointConnectionProxyId,
    privateEndpointConnectionProxy,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionProxyCreateOrUpdate();
}

main().catch(console.error);
