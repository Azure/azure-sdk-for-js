// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Configures flow log and traffic analytics (optional) on a specified resource.
 *
 * @summary Configures flow log and traffic analytics (optional) on a specified resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherFlowLogConfigure.json
 */

import type { NetworkWatchersSetFlowLogConfigurationParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configureFlowLog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const options: NetworkWatchersSetFlowLogConfigurationParameters = {
    body: {
      properties: {
        enabled: true,
        storageId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/st1",
      },
      targetResourceId:
        "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/nsg1",
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/configureFlowLog",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

configureFlowLog().catch(console.error);
