// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
 *
 * @summary Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ConfigurationPolicyGroupPut.json
 */
async function configurationPolicyGroupPut() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const configurationPolicyGroupName = "policyGroup1";
  const options = {
    body: {
      properties: {
        isDefault: true,
        policyMembers: [
          {
            name: "policy1",
            attributeType: "RadiusAzureGroupId",
            attributeValue: "6ad1bd08",
          },
          {
            name: "policy2",
            attributeType: "CertificateGroupId",
            attributeValue: "red.com",
          },
        ],
        priority: 0,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}",
      subscriptionId,
      resourceGroupName,
      vpnServerConfigurationName,
      configurationPolicyGroupName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

configurationPolicyGroupPut().catch(console.error);
