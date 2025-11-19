// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates NetworkMonitor resource.
 *
 * @summary creates NetworkMonitor resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkMonitors_Create.json
 */
async function networkMonitorsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkMonitors.create("example-rg", "example-monitor", {
    properties: {
      annotation: "annotation",
      bmpConfiguration: {
        stationConfigurationState: "Enabled",
        scopeResourceId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric",
        stationName: "name",
        stationIp: "10.0.0.1",
        stationPort: 62695,
        stationConnectionMode: "Active",
        stationConnectionProperties: {
          keepaliveIdleTime: 49,
          probeInterval: 3558,
          probeCount: 43,
        },
        stationNetwork:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/example-l3domain/internalNetworks/example-internalnetwork",
        monitoredNetworks: [
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/example-l3domain",
        ],
        exportPolicy: "Pre-Policy",
        monitoredAddressFamilies: ["ipv4Unicast"],
      },
      administrativeState: "Enabled",
    },
    tags: { key: "value" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkMonitorsCreate();
}

main().catch(console.error);
