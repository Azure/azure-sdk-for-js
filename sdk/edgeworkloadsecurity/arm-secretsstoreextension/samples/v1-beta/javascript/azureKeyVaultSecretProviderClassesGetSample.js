// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecretsStoreExtensionManagementClient } = require("@azure/arm-secretsstoreextension");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of an AzureKeyVaultSecretProviderClass instance.
 *
 * @summary gets the properties of an AzureKeyVaultSecretProviderClass instance.
 * x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Get_MaximumSet_Gen.json
 */
async function azureKeyVaultSecretProviderClassesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const result = await client.azureKeyVaultSecretProviderClasses.get(
    "rg-ssc-example",
    "akvspc-ssc-example",
  );
  console.log(result);
}

async function main() {
  await azureKeyVaultSecretProviderClassesGet();
}

main().catch(console.error);
