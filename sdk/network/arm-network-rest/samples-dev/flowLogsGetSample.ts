// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { FlowLogsGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a flow log resource by name.
 *
 * @summary Gets a flow log resource by name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherFlowLogGet.json
 */
async function getFlowLog() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const flowLogName = "flowLog1";
  const options: FlowLogsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/flowLogs/{flowLogName}",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
      flowLogName,
    )
    .get(options);
  console.log(result);
}

getFlowLog().catch(console.error);
