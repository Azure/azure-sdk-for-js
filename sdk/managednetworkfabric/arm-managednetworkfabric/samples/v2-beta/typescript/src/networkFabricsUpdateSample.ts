// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update certain properties of the Network Fabric resource.
 *
 * @summary update certain properties of the Network Fabric resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_Update.json
 */
async function networkFabricsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.update("example-rg", "example-fabric", {
    tags: { keyId: "keyValue" },
    identity: { type: "None", userAssignedIdentities: { key872: {} } },
    properties: {
      annotation: "annotation1",
      rackCount: 6,
      serverCountPerRack: 10,
      ipv4Prefix: "10.18.0.0/17",
      ipv6Prefix: "3FFE:FFFF:0:CD40::/60",
      fabricASN: 12345,
      storageAccountConfiguration: {
        storageAccountId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Storage/storageAccounts/nfStorage",
        storageAccountIdentity: {
          identityType: "UserAssignedIdentity",
          userAssignedIdentityResourceId:
            "/subscriptions/12345678-1234-1234-1234-123456789abc/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/my-id",
        },
      },
      terminalServerConfiguration: {
        username: "username1",
        password: "xxxxxxxx",
        serialNumber: "1234567",
        primaryIpv4Prefix: "10.0.0.12/30",
        primaryIpv6Prefix: "4FFE:FFFF:0:CD30::a8/127",
        secondaryIpv4Prefix: "40.0.0.14/30",
        secondaryIpv6Prefix: "6FFE:FFFF:0:CD30::ac/127",
      },
      managementNetworkConfiguration: {
        infrastructureVpnConfiguration: {
          networkToNetworkInterconnectId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric/networkToNetworkInterconnects/example-nni",
          peeringOption: "OptionA",
          optionBProperties: {
            importRouteTargets: ["65046:10050"],
            exportRouteTargets: ["65046:10050"],
            routeTargets: {
              importIpv4RouteTargets: ["65046:10050"],
              importIpv6RouteTargets: ["65046:10050"],
              exportIpv4RouteTargets: ["65046:10050"],
              exportIpv6RouteTargets: ["65046:10050"],
            },
          },
          optionAProperties: {
            mtu: 1501,
            vlanId: 3001,
            peerASN: 1235,
            bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
            primaryIpv4Prefix: "10.0.0.12/30",
            primaryIpv6Prefix: "4FFE:FFFF:0:CD30::a8/127",
            secondaryIpv4Prefix: "20.0.0.13/30",
            secondaryIpv6Prefix: "6FFE:FFFF:0:CD30::ac/127",
          },
        },
        workloadVpnConfiguration: {
          networkToNetworkInterconnectId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric/networkToNetworkInterconnects/example-nni",
          peeringOption: "OptionA",
          optionBProperties: {
            importRouteTargets: ["65046:10050"],
            exportRouteTargets: ["65046:10050"],
            routeTargets: {
              importIpv4RouteTargets: ["65046:10050"],
              importIpv6RouteTargets: ["65046:10050"],
              exportIpv4RouteTargets: ["65046:10050"],
              exportIpv6RouteTargets: ["65046:10050"],
            },
          },
          optionAProperties: {
            mtu: 1500,
            vlanId: 3000,
            peerASN: 61234,
            bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
            primaryIpv4Prefix: "10.0.0.14/30",
            primaryIpv6Prefix: "2FFE:FFFF:0:CD30::a7/126",
            secondaryIpv4Prefix: "10.0.0.15/30",
            secondaryIpv6Prefix: "2FFE:FFFF:0:CD30::ac/126",
          },
        },
      },
      hardwareAlertThreshold: 43,
      controlPlaneAcls: [
        "/subscriptions/xxxxxx/resourceGroups/resourcegroupname/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
      ],
      trustedIpPrefixes: [
        "/subscriptions/xxxxxx/resourceGroups/resourcegroupname/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/example-prefix",
      ],
      uniqueRdConfiguration: {
        uniqueRdConfigurationState: "Enabled",
        nniDerivedUniqueRdConfigurationState: "Enabled",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsUpdateMaximumSetGen();
}

main().catch(console.error);
