// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  DefaultSecurityRulesGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get the specified default network security rule.
 *
 * @summary Get the specified default network security rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/DefaultSecurityRuleGet.json
 */
async function defaultSecurityRuleGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const networkSecurityGroupName = "nsg1";
  const defaultSecurityRuleName = "AllowVnetInBound";
  const options: DefaultSecurityRulesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/defaultSecurityRules/{defaultSecurityRuleName}",
      subscriptionId,
      resourceGroupName,
      networkSecurityGroupName,
      defaultSecurityRuleName,
    )
    .get(options);
  console.log(result);
}

defaultSecurityRuleGet().catch(console.error);
