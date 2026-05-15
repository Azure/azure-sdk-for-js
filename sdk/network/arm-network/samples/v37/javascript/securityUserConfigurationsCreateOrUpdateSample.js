// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network manager security user configuration.
 *
 * @summary creates or updates a network manager security user configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserConfigurationPut.json
 */
async function createNetworkManagerSecurityUserConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserConfigurations.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    { description: "A sample policy" },
  );
  console.log(result);
}

async function main() {
  await createNetworkManagerSecurityUserConfiguration();
}

main().catch(console.error);
