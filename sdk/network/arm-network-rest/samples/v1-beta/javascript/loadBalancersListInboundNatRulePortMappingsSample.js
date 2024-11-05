// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List of inbound NAT rule port mappings.
 *
 * @summary List of inbound NAT rule port mappings.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/QueryInboundNatRulePortMapping.json
 */
async function queryInboundNatRulePortMapping() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const groupName = "rg1";
  const loadBalancerName = "lb1";
  const backendPoolName = "bp1";
  const options = {
    body: { ipAddress: "10.0.0.4" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendPoolName}/queryInboundNatRulePortMapping",
      subscriptionId,
      groupName,
      loadBalancerName,
      backendPoolName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

queryInboundNatRulePortMapping().catch(console.error);
