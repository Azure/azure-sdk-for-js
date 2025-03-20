// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PrivateEndpointsListBySubscriptionParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all private endpoints in a subscription.
 *
 * @summary Gets all private endpoints in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointListAll.json
 */
async function listAllPrivateEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const options: PrivateEndpointsListBySubscriptionParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/privateEndpoints",
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

listAllPrivateEndpoints().catch(console.error);
