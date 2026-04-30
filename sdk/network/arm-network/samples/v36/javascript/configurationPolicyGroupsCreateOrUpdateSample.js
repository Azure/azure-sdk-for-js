// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
 *
 * @summary Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ConfigurationPolicyGroupPut.json
 */
async function configurationPolicyGroupPut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const configurationPolicyGroupName = "policyGroup1";
  const vpnServerConfigurationPolicyGroupParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.configurationPolicyGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vpnServerConfigurationName,
    configurationPolicyGroupName,
    vpnServerConfigurationPolicyGroupParameters,
  );
  console.log(result);
}

async function main() {
  await configurationPolicyGroupPut();
}

main().catch(console.error);
