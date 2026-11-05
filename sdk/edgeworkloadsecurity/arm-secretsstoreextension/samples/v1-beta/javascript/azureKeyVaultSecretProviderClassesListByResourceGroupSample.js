// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecretsStoreExtensionManagementClient } = require("@azure/arm-secretsstoreextension");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the AzureKeyVaultSecretProviderClass instances within a resource group.
 *
 * @summary lists the AzureKeyVaultSecretProviderClass instances within a resource group.
 * x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_ListByResourceGroup_MaximumSet_Gen.json
 */
async function azureKeyVaultSecretProviderClassesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureKeyVaultSecretProviderClasses.listByResourceGroup(
    "rg-ssc-example",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await azureKeyVaultSecretProviderClassesListByResourceGroup();
}

main().catch(console.error);
