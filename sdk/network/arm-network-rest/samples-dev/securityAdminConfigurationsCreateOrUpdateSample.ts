// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SecurityAdminConfigurationsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a network manager security admin configuration.
 *
 * @summary Creates or updates a network manager security admin configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerSecurityAdminConfigurationPut.json
 */
async function createNetworkManagerSecurityAdminConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const options: SecurityAdminConfigurationsCreateOrUpdateParameters = {
    body: {
      properties: {
        description: "A sample policy",
        applyOnNetworkIntentPolicyBasedServices: ["None"],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityAdminConfigurations/{configurationName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      configurationName,
    )
    .put(options);
  console.log(result);
}

createNetworkManagerSecurityAdminConfiguration().catch(console.error);
