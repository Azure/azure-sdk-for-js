// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkGroupsDeleteParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes a network group.
 *
 * @summary Deletes a network group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerGroupDelete.json
 */
async function networkGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const networkGroupName = "testNetworkGroup";
  const options: NetworkGroupsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01", force: false },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/networkGroups/{networkGroupName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      networkGroupName,
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

networkGroupsDelete().catch(console.error);
