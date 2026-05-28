// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes any information about the association.
 *
 * @summary refreshes any information about the association.
 * x-ms-original-file: 2025-08-01/NetworkSecurityPerimeterConfigurationReconcile.json
 */
async function networkSecurityPerimeterConfigurationReconcile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterConfigurations.reconcile(
    "res4410",
    "sto8607",
    "dbedb4e0-40e6-4145-81f3-f1314c150774.resourceAssociation1",
  );
}

async function main() {
  await networkSecurityPerimeterConfigurationReconcile();
}

main().catch(console.error);
