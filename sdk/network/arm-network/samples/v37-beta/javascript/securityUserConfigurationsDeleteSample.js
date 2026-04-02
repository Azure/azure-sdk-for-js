// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a network manager security user configuration.
 *
 * @summary deletes a network manager security user configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserConfigurationDelete.json
 */
async function deleteNetworkManagerSecurityUserConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityUserConfigurations.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    { force: false },
  );
}

async function main() {
  await deleteNetworkManagerSecurityUserConfiguration();
}

main().catch(console.error);
