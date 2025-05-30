/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  NetworkToNetworkInterconnectPatch,
  AzureNetworkFabricManagementServiceAPI
} from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update certain properties of the Network To NetworkInterconnects resource.
 *
 * @summary Update certain properties of the Network To NetworkInterconnects resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkToNetworkInterconnects_Update_MaximumSet_Gen.json
 */
async function networkToNetworkInterconnectsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] ||
    "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName =
    process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const networkToNetworkInterconnectName = "example-nni";
  const body: NetworkToNetworkInterconnectPatch = {
    egressAclId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
    exportRoutePolicy: {
      exportIpv4RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy1",
      exportIpv6RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy1"
    },
    importRoutePolicy: {
      importIpv4RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy1",
      importIpv6RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy1"
    },
    ingressAclId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
    layer2Configuration: {
      interfaces: [
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkDevices/example-networkDevice/networkInterfaces/example-networkInterface"
      ],
      mtu: 1500
    },
    npbStaticRouteConfiguration: {
      bfdConfiguration: { intervalInMilliSeconds: 310, multiplier: 15 },
      ipv4Routes: [{ nextHop: ["21.20.20.10"], prefix: "20.0.0.11/30" }],
      ipv6Routes: [
        {
          nextHop: ["5FFE:FFFF:0:CD30::ac"],
          prefix: "4FFE:FFFF:0:CD30::ac/127"
        }
      ]
    },
    optionBLayer3Configuration: {
      peerASN: 2345,
      primaryIpv4Prefix: "20.0.0.12/29",
      primaryIpv6Prefix: "4FFE:FFFF:0:CD30::a8/127",
      secondaryIpv4Prefix: "20.0.0.14/29",
      secondaryIpv6Prefix: "6FFE:FFFF:0:CD30::ac/127",
      vlanId: 1235
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(
    credential,
    subscriptionId
  );
  const result = await client.networkToNetworkInterconnects.beginUpdateAndWait(
    resourceGroupName,
    networkFabricName,
    networkToNetworkInterconnectName,
    body
  );
  console.log(result);
}

async function main(): Promise<void> {
  networkToNetworkInterconnectsUpdateMaximumSetGen();
}

main().catch(console.error);
