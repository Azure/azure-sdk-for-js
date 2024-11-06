// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ScopeConnectionsDeleteParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete the pending scope connection created by this network manager.
 *
 * @summary Delete the pending scope connection created by this network manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerScopeConnectionDelete.json
 */
async function deleteNetworkManagerScopeConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const scopeConnectionName = "TestScopeConnection";
  const options: ScopeConnectionsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/scopeConnections/{scopeConnectionName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      scopeConnectionName,
    )
    .delete(options);
  console.log(result);
}

deleteNetworkManagerScopeConnection().catch(console.error);
