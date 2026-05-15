// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the network manager security user configurations in a network manager, in a paginated format.
 *
 * @summary lists all the network manager security user configurations in a network manager, in a paginated format.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserConfigurationList.json
 */
async function listSecurityUserConfigurationsInANetworkManager() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityUserConfigurations.list("rg1", "testNetworkManager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityUserConfigurationsInANetworkManager();
}

main().catch(console.error);
