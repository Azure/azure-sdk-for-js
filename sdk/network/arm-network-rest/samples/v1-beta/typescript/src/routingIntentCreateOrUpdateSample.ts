// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  RoutingIntentCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
 *
 * @summary Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RoutingIntentPut.json
 */
async function routeTablePut() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const routingIntentName = "Intent1";
  const options: RoutingIntentCreateOrUpdateParameters = {
    body: {
      properties: {
        routingPolicies: [
          {
            name: "InternetTraffic",
            destinations: ["Internet"],
            nextHop:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azfw1"
          },
          {
            name: "PrivateTrafficPolicy",
            destinations: ["PrivateTraffic"],
            nextHop:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azfw1"
          }
        ]
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routingIntent/{routingIntentName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
      routingIntentName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

routeTablePut().catch(console.error);
