// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretsStoreExtensionManagementClient } from "@azure/arm-secretsstoreextension";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of an AzureKeyVaultSecretProviderClass instance.
 *
 * @summary gets the properties of an AzureKeyVaultSecretProviderClass instance.
 * x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Get_MaximumSet_Gen.json
 */
async function azureKeyVaultSecretProviderClassesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const result = await client.azureKeyVaultSecretProviderClasses.get(
    "rg-ssc-example",
    "akvspc-ssc-example",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureKeyVaultSecretProviderClassesGet();
}

main().catch(console.error);
