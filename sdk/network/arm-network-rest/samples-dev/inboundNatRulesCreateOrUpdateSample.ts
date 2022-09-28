// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  InboundNatRulesCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a load balancer inbound NAT rule.
 *
 * @summary Creates or updates a load balancer inbound NAT rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/InboundNatRuleCreate.json
 */
async function inboundNatRuleCreate() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const loadBalancerName = "lb1";
  const inboundNatRuleName = "natRule1.1";
  const options: InboundNatRulesCreateOrUpdateParameters = {
    body: {
      properties: {
        backendPort: 3389,
        enableFloatingIP: false,
        enableTcpReset: false,
        frontendIPConfiguration: {
          id:
            "/subscriptions/subid/resourceGroups/testrg/providers/Microsoft.Network/loadBalancers/lb1/frontendIPConfigurations/ip1",
        },
        frontendPort: 3390,
        idleTimeoutInMinutes: 4,
        protocol: "Tcp",
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/inboundNatRules/{inboundNatRuleName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
      inboundNatRuleName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

inboundNatRuleCreate().catch(console.error);
