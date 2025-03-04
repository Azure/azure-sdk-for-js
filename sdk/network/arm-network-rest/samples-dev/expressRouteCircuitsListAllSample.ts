// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ExpressRouteCircuitsListAllParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all the express route circuits in a subscription.
 *
 * @summary Gets all the express route circuits in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCircuitListBySubscription.json
 */
async function listExpressRouteCircuitsInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const options: ExpressRouteCircuitsListAllParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteCircuits",
      subscriptionId,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listExpressRouteCircuitsInASubscription().catch(console.error);
