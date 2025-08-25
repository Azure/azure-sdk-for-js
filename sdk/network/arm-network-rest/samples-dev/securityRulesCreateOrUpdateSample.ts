// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a security rule in the specified network security group.
 *
 * @summary Creates or updates a security rule in the specified network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkSecurityGroupRuleCreate.json
 */

import type { SecurityRulesCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createSecurityRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkSecurityGroupName = "testnsg";
  const securityRuleName = "rule1";
  const options: SecurityRulesCreateOrUpdateParameters = {
    body: {
      properties: {
        access: "Deny",
        destinationAddressPrefix: "11.0.0.0/8",
        destinationPortRange: "8080",
        direction: "Outbound",
        priority: 100,
        sourceAddressPrefix: "10.0.0.0/8",
        sourcePortRange: "*",
        protocol: "*",
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}",
      subscriptionId,
      resourceGroupName,
      networkSecurityGroupName,
      securityRuleName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createSecurityRule().catch(console.error);
