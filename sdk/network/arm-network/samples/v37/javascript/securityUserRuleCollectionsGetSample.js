// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a network manager security user configuration rule collection.
 *
 * @summary gets a network manager security user configuration rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserRuleCollectionGet.json
 */
async function getsSecurityUserRuleCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserRuleCollections.get(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
  );
  console.log(result);
}

async function main() {
  await getsSecurityUserRuleCollection();
}

main().catch(console.error);
