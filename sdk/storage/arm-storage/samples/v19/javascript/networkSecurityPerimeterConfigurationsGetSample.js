// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets effective NetworkSecurityPerimeterConfiguration for association
 *
 * @summary Gets effective NetworkSecurityPerimeterConfiguration for association
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/NetworkSecurityPerimeterConfigurationGet.json
 */
async function networkSecurityPerimeterConfigurationGet() {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4410";
  const accountName = "sto8607";
  const networkSecurityPerimeterConfigurationName =
    "dbedb4e0-40e6-4145-81f3-f1314c150774.resourceAssociation1";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    resourceGroupName,
    accountName,
    networkSecurityPerimeterConfigurationName,
  );
  console.log(result);
}

async function main() {
  await networkSecurityPerimeterConfigurationGet();
}

main().catch(console.error);
