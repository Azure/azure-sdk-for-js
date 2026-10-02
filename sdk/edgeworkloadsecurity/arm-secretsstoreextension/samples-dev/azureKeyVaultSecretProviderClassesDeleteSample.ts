// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretsStoreExtensionManagementClient } from "@azure/arm-secretsstoreextension";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an AzureKeyVaultSecretProviderClass instance.
 *
 * @summary deletes an AzureKeyVaultSecretProviderClass instance.
 * x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Delete_MaximumSet_Gen.json
 */
async function azureKeyVaultSecretProviderClassesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  await client.azureKeyVaultSecretProviderClasses.delete("rg-ssc-example", "akvspc-ssc-example");
}

async function main(): Promise<void> {
  await azureKeyVaultSecretProviderClassesDelete();
}

main().catch(console.error);
