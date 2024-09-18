// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { SecurityRulesGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get the specified network security rule.
 *
 * @summary Get the specified network security rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkSecurityGroupRuleGet.json
 */
async function getNetworkSecurityRuleInNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkSecurityGroupName = "testnsg";
  const securityRuleName = "rule1";
  const options: SecurityRulesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}",
      subscriptionId,
      resourceGroupName,
      networkSecurityGroupName,
      securityRuleName,
    )
    .get(options);
  console.log(result);
}

getNetworkSecurityRuleInNetworkSecurityGroup().catch(console.error);
