// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRouteCrossConnectionsGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets details about the specified ExpressRouteCrossConnection.
 *
 * @summary Gets details about the specified ExpressRouteCrossConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCrossConnectionGet.json
 */
async function getExpressRouteCrossConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "CrossConnection-SiliconValley";
  const crossConnectionName = "<circuitServiceKey>";
  const options: ExpressRouteCrossConnectionsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}",
      subscriptionId,
      resourceGroupName,
      crossConnectionName,
    )
    .get(options);
  console.log(result);
}

getExpressRouteCrossConnection().catch(console.error);
