// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a network manager security admin configuration.
 *
 * @summary Creates or updates a network manager security admin configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerSecurityAdminConfigurationPut_ManualAggregation.json
 */
async function createManualModeSecurityAdminConfiguration() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const securityAdminConfiguration = {
    description:
      "A configuration which will update any network groups ip addresses at commit times.",
    networkGroupAddressSpaceAggregationOption: "Manual",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityAdminConfigurations.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    securityAdminConfiguration,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a network manager security admin configuration.
 *
 * @summary Creates or updates a network manager security admin configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerSecurityAdminConfigurationPut.json
 */
async function createNetworkManagerSecurityAdminConfiguration() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const securityAdminConfiguration = {
    description: "A sample policy",
    applyOnNetworkIntentPolicyBasedServices: ["None"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityAdminConfigurations.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    securityAdminConfiguration,
  );
  console.log(result);
}

async function main() {
  await createManualModeSecurityAdminConfiguration();
  await createNetworkManagerSecurityAdminConfiguration();
}

main().catch(console.error);
