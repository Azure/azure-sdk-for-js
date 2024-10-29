// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ConnectionMonitorsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update a connection monitor.
 *
 * @summary Create or update a connection monitor.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherConnectionMonitorCreate.json
 */
async function createConnectionMonitorV1() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const connectionMonitorName = "cm1";
  const options: ConnectionMonitorsCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        endpoints: [
          {
            name: "source",
            resourceId:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/ct1",
          },
          { name: "destination", address: "bing.com" },
        ],
        testConfigurations: [
          {
            name: "tcp",
            tcpConfiguration: { port: 80 },
            testFrequencySec: 60,
            protocol: "Tcp",
          },
        ],
        testGroups: [
          {
            name: "tg",
            destinations: ["destination"],
            sources: ["source"],
            testConfigurations: ["tcp"],
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectionMonitors/{connectionMonitorName}",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
      connectionMonitorName,
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createConnectionMonitorV1().catch(console.error);
/**
 * This sample demonstrates how to Create or update a connection monitor.
 *
 * @summary Create or update a connection monitor.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherConnectionMonitorV2Create.json
 */
async function createConnectionMonitorV2() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const connectionMonitorName = "cm1";
  const options: ConnectionMonitorsCreateOrUpdateParameters = {
    body: {
      properties: {
        endpoints: [
          {
            name: "vm1",
            resourceId:
              "/subscriptions/96e68903-0a56-4819-9987-8d08ad6a1f99/resourceGroups/NwRgIrinaCentralUSEUAP/providers/Microsoft.Compute/virtualMachines/vm1",
          },
          {
            name: "CanaryWorkspaceVamshi",
            filter: {
              type: "Include",
              items: [{ type: "AgentAddress", address: "npmuser" }],
            },
            resourceId:
              "/subscriptions/96e68903-0a56-4819-9987-8d08ad6a1f99/resourceGroups/vasamudrRG/providers/Microsoft.OperationalInsights/workspaces/vasamudrWorkspace",
          },
          { name: "bing", address: "bing.com" },
          { name: "google", address: "google.com" },
        ],
        outputs: [],
        testConfigurations: [
          {
            name: "testConfig1",
            tcpConfiguration: { disableTraceRoute: false, port: 80 },
            testFrequencySec: 60,
            protocol: "Tcp",
          },
        ],
        testGroups: [
          {
            name: "test1",
            destinations: ["bing", "google"],
            disable: false,
            sources: ["vm1", "CanaryWorkspaceVamshi"],
            testConfigurations: ["testConfig1"],
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectionMonitors/{connectionMonitorName}",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
      connectionMonitorName,
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createConnectionMonitorV2().catch(console.error);
