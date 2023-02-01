// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create or update a flow log for the specified network security group.
 *
 * @summary Create or update a flow log for the specified network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherFlowLogCreate.json
 */
async function createOrUpdateFlowLog() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const flowLogName = "fl";
  const options = {
    body: {
      location: "centraluseuap",
      properties: {
        format: { type: "JSON", version: 1 },
        enabled: true,
        storageId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/nwtest1mgvbfmqsigdxe",
        targetResourceId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/desmondcentral-nsg",
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/flowLogs/{flowLogName}",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
      flowLogName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateFlowLog().catch(console.error);
