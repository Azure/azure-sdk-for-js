// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a network manager security admin configuration.
 *
 * @summary deletes a network manager security admin configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityAdminConfigurationDelete.json
 */
async function deleteNetworkManagerSecurityAdminConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityAdminConfigurations.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    { force: false },
  );
}

async function main() {
  await deleteNetworkManagerSecurityAdminConfiguration();
}

main().catch(console.error);
