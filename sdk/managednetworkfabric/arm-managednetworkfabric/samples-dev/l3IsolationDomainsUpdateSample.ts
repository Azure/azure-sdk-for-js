// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to update certain properties of the L3 Isolation Domain resource.
 *
 * @summary API to update certain properties of the L3 Isolation Domain resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L3IsolationDomains_Update_MaximumSet_Gen.json
 */

import type { L3IsolationDomainPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function l3IsolationDomainsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l3IsolationDomainName = "example-l3domain";
  const body: L3IsolationDomainPatch = {
    aggregateRouteConfiguration: {
      ipv4Routes: [{ prefix: "10.0.0.0/24" }],
      ipv6Routes: [{ prefix: "3FFE:FFFF:0:CD30::a0/29" }],
    },
    annotation: "annotation1",
    connectedSubnetRoutePolicy: {
      exportRoutePolicy: {
        exportIpv4RoutePolicyId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy1",
        exportIpv6RoutePolicyId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy1",
      },
      exportRoutePolicyId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
    },
    redistributeConnectedSubnets: "True",
    redistributeStaticRoutes: "False",
    tags: { key4953: "1234" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l3IsolationDomains.beginUpdateAndWait(
    resourceGroupName,
    l3IsolationDomainName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l3IsolationDomainsUpdateMaximumSetGen();
}

main().catch(console.error);
