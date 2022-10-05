// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  AdminRuleCollectionsCreateOrUpdateParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates an admin rule collection.
 *
 * @summary Creates or updates an admin rule collection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerAdminRuleCollectionPut.json
 */
async function createOrUpdateAnAdminRuleCollection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const ruleCollectionName = "testRuleCollection";
  const options: AdminRuleCollectionsCreateOrUpdateParameters = {
    body: {
      properties: {
        description: "A sample policy",
        appliesToGroups: [
          {
            networkGroupId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager/networkGroups/testGroup"
          }
        ]
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityAdminConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      configurationName,
      ruleCollectionName
    )
    .put(options);
  console.log(result);
}

createOrUpdateAnAdminRuleCollection().catch(console.error);
