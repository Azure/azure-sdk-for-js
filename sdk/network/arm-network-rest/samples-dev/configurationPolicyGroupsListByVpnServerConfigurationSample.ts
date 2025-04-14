// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ConfigurationPolicyGroupsListByVpnServerConfigurationParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
 *
 * @summary Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ConfigurationPolicyGroupListByVpnServerConfiguration.json
 */
async function configurationPolicyGroupListByVpnServerConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const options: ConfigurationPolicyGroupsListByVpnServerConfigurationParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups",
      subscriptionId,
      resourceGroupName,
      vpnServerConfigurationName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

configurationPolicyGroupListByVpnServerConfiguration().catch(console.error);
