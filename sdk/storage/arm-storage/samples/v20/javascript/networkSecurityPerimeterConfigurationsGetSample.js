// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets effective NetworkSecurityPerimeterConfiguration for association
 *
 * @summary gets effective NetworkSecurityPerimeterConfiguration for association
 * x-ms-original-file: 2026-04-01/NetworkSecurityPerimeterConfigurationGet.json
 */
async function networkSecurityPerimeterConfigurationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "res4410",
    "sto8607",
    "dbedb4e0-40e6-4145-81f3-f1314c150774.resourceAssociation1",
  );
  console.log(result);
}

async function main() {
  await networkSecurityPerimeterConfigurationGet();
}

main().catch(console.error);
