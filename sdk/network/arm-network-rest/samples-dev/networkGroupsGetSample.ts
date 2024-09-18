// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { NetworkGroupsGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the specified network group.
 *
 * @summary Gets the specified network group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerGroupGet.json
 */
async function networkGroupsGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const networkGroupName = "testNetworkGroup";
  const options: NetworkGroupsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/networkGroups/{networkGroupName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      networkGroupName,
    )
    .get(options);
  console.log(result);
}

networkGroupsGet().catch(console.error);
