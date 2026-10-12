// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecretsStoreExtensionManagementClient } = require("@azure/arm-secretsstoreextension");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the AzureKeyVaultSecretProviderClass instances within an Azure subscription.
 *
 * @summary lists the AzureKeyVaultSecretProviderClass instances within an Azure subscription.
 * x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_ListBySubscription_MaximumSet_Gen.json
 */
async function azureKeyVaultSecretProviderClassesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureKeyVaultSecretProviderClasses.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await azureKeyVaultSecretProviderClassesListBySubscription();
}

main().catch(console.error);
