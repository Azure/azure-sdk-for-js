// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance Inbound Security Rules.
 *
 * @summary Creates or updates the specified Network Virtual Appliance Inbound Security Rules.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/InboundSecurityRulePut.json
 */
async function createNetworkVirtualApplianceInboundSecurityRules() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkVirtualApplianceName = "nva";
  const ruleCollectionName = "rule1";
  const options = {
    body: {
      properties: {
        rules: [
          {
            destinationPortRange: 22,
            sourceAddressPrefix: "50.20.121.5/32",
            protocol: "TCP",
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/inboundSecurityRules/{ruleCollectionName}",
      subscriptionId,
      resourceGroupName,
      networkVirtualApplianceName,
      ruleCollectionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createNetworkVirtualApplianceInboundSecurityRules().catch(console.error);
