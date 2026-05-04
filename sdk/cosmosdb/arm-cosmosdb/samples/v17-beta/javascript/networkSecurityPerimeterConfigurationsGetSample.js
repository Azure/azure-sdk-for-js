// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets effective Network Security Perimeter Configuration for association
 *
 * @summary gets effective Network Security Perimeter Configuration for association
 * x-ms-original-file: 2025-11-01-preview/NetworkSecurityPerimeterConfigurationGet.json
 */
async function namspaceNetworkSecurityPerimeterConfigurationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "res4410",
    "cosmosTest",
    "dbedb4e0-40e6-4145-81f3-f1314c150774.resourceAssociation1",
  );
  console.log(result);
}

async function main() {
  await namspaceNetworkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
