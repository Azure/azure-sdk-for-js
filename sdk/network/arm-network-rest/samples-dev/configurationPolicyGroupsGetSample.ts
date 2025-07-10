// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ConfigurationPolicyGroupsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the details of a ConfigurationPolicyGroup.
 *
 * @summary Retrieves the details of a ConfigurationPolicyGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ConfigurationPolicyGroupGet.json
 */
async function configurationPolicyGroupGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const configurationPolicyGroupName = "policyGroup1";
  const options: ConfigurationPolicyGroupsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}",
      subscriptionId,
      resourceGroupName,
      vpnServerConfigurationName,
      configurationPolicyGroupName,
    )
    .get(options);
  console.log(result);
}

configurationPolicyGroupGet().catch(console.error);
