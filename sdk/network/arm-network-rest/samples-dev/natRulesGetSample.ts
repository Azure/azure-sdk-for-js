// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves the details of a nat ruleGet.
 *
 * @summary Retrieves the details of a nat ruleGet.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NatRuleGet.json
 */

import type { NatRulesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function natRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "gateway1";
  const natRuleName = "natRule1";
  const options: NatRulesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}",
      subscriptionId,
      resourceGroupName,
      gatewayName,
      natRuleName,
    )
    .get(options);
  console.log(result);
}

natRuleGet().catch(console.error);
