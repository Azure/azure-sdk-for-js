// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an admin rule collection.
 *
 * @summary deletes an admin rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerAdminRuleCollectionDelete.json
 */
async function deletesAnAdminRuleCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.adminRuleCollections.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    { force: false },
  );
}

async function main() {
  await deletesAnAdminRuleCollection();
}

main().catch(console.error);
