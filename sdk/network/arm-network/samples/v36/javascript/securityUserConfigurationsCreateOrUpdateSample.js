// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a network manager security user configuration.
 *
 * @summary Creates or updates a network manager security user configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerSecurityUserConfigurationPut.json
 */
async function createNetworkManagerSecurityUserConfiguration() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const securityUserConfiguration = {
    description: "A sample policy",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserConfigurations.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    securityUserConfiguration,
  );
  console.log(result);
}

async function main() {
  await createNetworkManagerSecurityUserConfiguration();
}

main().catch(console.error);
