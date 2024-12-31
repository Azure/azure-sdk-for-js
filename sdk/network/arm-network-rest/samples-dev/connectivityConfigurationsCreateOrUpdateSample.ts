// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ConnectivityConfigurationsCreateOrUpdateParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates/Updates a new network manager connectivity configuration
 *
 * @summary Creates/Updates a new network manager connectivity configuration
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectivityConfigurationPut.json
 */
async function connectivityConfigurationsPut() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestConnectivityConfig";
  const options: ConnectivityConfigurationsCreateOrUpdateParameters = {
    body: {
      properties: {
        description: "Sample Configuration",
        appliesToGroups: [
          {
            groupConnectivity: "None",
            isGlobal: "False",
            networkGroupId:
              "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkManagers/testNetworkManager/networkGroups/group1",
            useHubGateway: "True",
          },
        ],
        connectivityTopology: "HubAndSpoke",
        deleteExistingPeering: "True",
        hubs: [
          {
            resourceId:
              "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myTestConnectivityConfig",
            resourceType: "Microsoft.Network/virtualNetworks",
          },
        ],
        isGlobal: "True",
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/connectivityConfigurations/{configurationName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      configurationName,
    )
    .put(options);
  console.log(result);
}

connectivityConfigurationsPut().catch(console.error);
