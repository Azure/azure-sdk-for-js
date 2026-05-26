// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes any information about the association.
 *
 * @summary refreshes any information about the association.
 * x-ms-original-file: 2025-11-01-preview/NetworkSecurityPerimeterConfigurationReconcile.json
 */
async function networkSecurityPerimeterConfigurationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterConfigurations.reconcile(
    "res4410",
    "sto8607",
    "dbedb4e0-40e6-4145-81f3-f1314c150774.resourceAssociation1",
  );
}

async function main() {
  await networkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
