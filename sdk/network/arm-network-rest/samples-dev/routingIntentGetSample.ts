// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { RoutingIntentGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves the details of a RoutingIntent.
 *
 * @summary Retrieves the details of a RoutingIntent.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RoutingIntentGet.json
 */
async function routeTableGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const routingIntentName = "Intent1";
  const options: RoutingIntentGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routingIntent/{routingIntentName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
      routingIntentName,
    )
    .get(options);
  console.log(result);
}

routeTableGet().catch(console.error);
