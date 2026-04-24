// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves a network manager security admin configuration.
 *
 * @summary Retrieves a network manager security admin configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerSecurityAdminConfigurationGet.json
 */
async function getSecurityAdminConfigurations() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityAdminConfigurations.get(
    resourceGroupName,
    networkManagerName,
    configurationName,
  );
  console.log(result);
}

async function main() {
  await getSecurityAdminConfigurations();
}

main().catch(console.error);
