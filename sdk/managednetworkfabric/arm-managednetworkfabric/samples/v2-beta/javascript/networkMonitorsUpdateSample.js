// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to update certain properties of the NetworkMonitor resource.
 *
 * @summary aPI to update certain properties of the NetworkMonitor resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkMonitors_Update.json
 */
async function networkMonitorsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkMonitors.update("example-rg", "example-monitor", {
    tags: { key: "value" },
    properties: {
      bmpConfiguration: {
        scopeResourceId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric",
        stationConfigurationState: "Enabled",
        stationName: "name",
        stationIp: "10.0.0.1",
        stationPort: 64685,
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
    },
  });
  console.log(result);
}

async function main() {
  await networkMonitorsUpdate();
}

main().catch(console.error);
