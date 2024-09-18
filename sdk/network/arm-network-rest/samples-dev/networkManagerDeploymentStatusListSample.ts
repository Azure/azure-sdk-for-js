// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkManagerDeploymentStatusListParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Post to List of Network Manager Deployment Status.
 *
 * @summary Post to List of Network Manager Deployment Status.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerDeploymentStatusList.json
 */
async function networkManagerDeploymentStatusList() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "resoureGroupSample";
  const networkManagerName = "testNetworkManager";
  const options: NetworkManagerDeploymentStatusListParameters = {
    body: {
      deploymentTypes: ["Connectivity", "SecurityAdmin"],
      regions: ["eastus", "westus"],
      skipToken: "FakeSkipTokenCode",
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/listDeploymentStatus",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
    )
    .post(options);
  console.log(result);
}

networkManagerDeploymentStatusList().catch(console.error);
