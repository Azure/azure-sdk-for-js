// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Initiate troubleshooting on a specified resource.
 *
 * @summary Initiate troubleshooting on a specified resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherTroubleshootGet.json
 */

import type { NetworkWatchersGetTroubleshootingParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTroubleshooting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const options: NetworkWatchersGetTroubleshootingParameters = {
    body: {
      properties: {
        storageId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/st1",
        storagePath: "https://st1.blob.core.windows.net/cn1",
      },
      targetResourceId:
        "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/troubleshoot",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

getTroubleshooting().catch(console.error);
