// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SecurityRulesListParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all security rules in a network security group.
 *
 * @summary Gets all security rules in a network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkSecurityGroupRuleList.json
 */
async function listNetworkSecurityRulesInNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkSecurityGroupName = "testnsg";
  const options: SecurityRulesListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/securityRules",
      subscriptionId,
      resourceGroupName,
      networkSecurityGroupName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listNetworkSecurityRulesInNetworkSecurityGroup().catch(console.error);
