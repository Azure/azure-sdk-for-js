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
  InternalNetwork,
  AzureNetworkFabricManagementServiceAPI
} from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates InternalNetwork PUT method.
 *
 * @summary Creates InternalNetwork PUT method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/InternalNetworks_Create_MaximumSet_Gen.json
 */
async function internalNetworksCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] ||
    "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName =
    process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l3IsolationDomainName = "example-l3domain";
  const internalNetworkName = "example-internalnetwork";
  const body: InternalNetwork = {
    annotation: "annotation",
    bgpConfiguration: {
      allowAS: 10,
      allowASOverride: "Enable",
      annotation: "annotation",
      bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 5 },
      defaultRouteOriginate: "True",
      ipv4ListenRangePrefixes: ["10.1.0.0/25"],
      ipv4NeighborAddress: [{ address: "10.1.0.0" }],
      ipv6ListenRangePrefixes: ["2fff::/66"],
      ipv6NeighborAddress: [{ address: "2fff::" }],
      peerASN: 61234
    },
    connectedIPv4Subnets: [{ annotation: "annotation", prefix: "10.0.0.0/24" }],
    connectedIPv6Subnets: [
      { annotation: "annotation", prefix: "3FFE:FFFF:0:CD30::a0/29" }
    ],
    egressAclId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
    exportRoutePolicy: {
      exportIpv4RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
      exportIpv6RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName"
    },
    exportRoutePolicyId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
    extension: "NoExtension",
    importRoutePolicy: {
      importIpv4RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
      importIpv6RoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName"
    },
    importRoutePolicyId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
    ingressAclId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
    isMonitoringEnabled: "True",
    mtu: 1500,
    staticRouteConfiguration: {
      bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 15 },
      extension: "NoExtension",
      ipv4Routes: [{ nextHop: ["10.0.0.1"], prefix: "jffgck" }],
      ipv6Routes: [{ nextHop: ["3ffe::1"], prefix: "2fff::/64" }]
    },
    vlanId: 755
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(
    credential,
    subscriptionId
  );
  const result = await client.internalNetworks.beginCreateAndWait(
    resourceGroupName,
    l3IsolationDomainName,
    internalNetworkName,
    body
  );
  console.log(result);
}

async function main(): Promise<void> {
  internalNetworksCreateMaximumSetGen();
}

main().catch(console.error);
