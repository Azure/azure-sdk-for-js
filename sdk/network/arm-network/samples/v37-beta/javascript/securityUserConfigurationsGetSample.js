// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a network manager security user configuration.
 *
 * @summary retrieves a network manager security user configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserConfigurationGet.json
 */
async function getSecurityUserConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserConfigurations.get(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
  );
  console.log(result);
}

async function main() {
  await getSecurityUserConfigurations();
}

main().catch(console.error);
