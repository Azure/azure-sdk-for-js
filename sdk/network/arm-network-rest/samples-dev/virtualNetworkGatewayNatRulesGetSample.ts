// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { VirtualNetworkGatewayNatRulesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the details of a nat rule.
 *
 * @summary Retrieves the details of a nat rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayNatRuleGet.json
 */
async function virtualNetworkGatewayNatRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayName = "gateway1";
  const natRuleName = "natRule1";
  const options: VirtualNetworkGatewayNatRulesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayName,
      natRuleName,
    )
    .get(options);
  console.log(result);
}

virtualNetworkGatewayNatRuleGet().catch(console.error);
