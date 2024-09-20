// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkWatchersGetAzureReachabilityReportParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions.
 *
 * @summary NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherAzureReachabilityReportGet.json
 */
async function getAzureReachabilityReport() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const options: NetworkWatchersGetAzureReachabilityReportParameters = {
    body: {
      azureLocations: ["West US"],
      endTime: new Date("2017-09-10T00:00:00Z"),
      providerLocation: { country: "United States", state: "washington" },
      providers: ["Frontier Communications of America, Inc. - ASN 5650"],
      startTime: new Date("2017-09-07T00:00:00Z"),
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/azureReachabilityReport",
      subscriptionId,
      resourceGroupName,
      networkWatcherName,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

getAzureReachabilityReport().catch(console.error);
