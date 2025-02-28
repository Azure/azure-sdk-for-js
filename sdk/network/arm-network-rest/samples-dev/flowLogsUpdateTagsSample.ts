// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { FlowLogsUpdateTagsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update tags of the specified flow log.
 *
 * @summary Update tags of the specified flow log.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherFlowLogUpdateTags.json
 */
async function updateFlowLogTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw";
  const flowLogName = "fl";
  const options: FlowLogsUpdateTagsParameters = {
    body: { tags: { tag1: "value1", tag2: "value2" } },
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
    .patch(options);
  console.log(result);
}

updateFlowLogTags().catch(console.error);
