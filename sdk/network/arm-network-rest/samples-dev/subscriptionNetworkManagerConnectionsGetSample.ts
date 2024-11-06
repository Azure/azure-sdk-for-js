// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  SubscriptionNetworkManagerConnectionsGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a specified connection created by this subscription.
 *
 * @summary Get a specified connection created by this subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectionSubscriptionGet.json
 */
async function getSubscriptionNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const networkManagerConnectionName = "TestNMConnection";
  const options: SubscriptionNetworkManagerConnectionsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}",
      subscriptionId,
      networkManagerConnectionName,
    )
    .get(options);
  console.log(result);
}

getSubscriptionNetworkManagerConnection().catch(console.error);
