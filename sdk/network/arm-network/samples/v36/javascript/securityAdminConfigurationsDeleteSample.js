// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a network manager security admin configuration.
 *
 * @summary Deletes a network manager security admin configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerSecurityAdminConfigurationDelete.json
 */
async function deleteNetworkManagerSecurityAdminConfiguration() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const force = false;
  const options = { force };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityAdminConfigurations.beginDeleteAndWait(
    resourceGroupName,
    networkManagerName,
    configurationName,
    options,
  );
  console.log(result);
}

async function main() {
  await deleteNetworkManagerSecurityAdminConfiguration();
}

main().catch(console.error);
