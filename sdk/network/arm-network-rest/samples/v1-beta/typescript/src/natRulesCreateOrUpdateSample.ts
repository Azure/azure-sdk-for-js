// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NatRulesCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules.
 *
 * @summary Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NatRulePut.json
 */
async function natRulePut() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "gateway1";
  const natRuleName = "natRule1";
  const options: NatRulesCreateOrUpdateParameters = {
    body: {
      properties: {
        type: "Static",
        externalMappings: [{ addressSpace: "192.168.21.0/24" }],
        internalMappings: [{ addressSpace: "10.4.0.0/24" }],
        ipConfigurationId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/cloudnet1-VNG/ipConfigurations/default",
        mode: "EgressSnat"
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}",
      subscriptionId,
      resourceGroupName,
      gatewayName,
      natRuleName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

natRulePut().catch(console.error);
