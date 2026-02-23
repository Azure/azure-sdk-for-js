// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates an admin rule collection.
 *
 * @summary Creates or updates an admin rule collection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerAdminRuleCollectionPut.json
 */
async function createOrUpdateAnAdminRuleCollection() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const ruleCollectionName = "testRuleCollection";
  const ruleCollection = {
    description: "A sample policy",
    appliesToGroups: [
      {
        networkGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager/networkGroups/testGroup",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.adminRuleCollections.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    ruleCollection,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAnAdminRuleCollection();
}

main().catch(console.error);
