// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretsStoreExtensionManagementClient } from "@azure/arm-secretsstoreextension";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an AzureKeyVaultSecretProviderClass instance.
 *
 * @summary updates an AzureKeyVaultSecretProviderClass instance.
 * x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Update_MaximumSet_Gen.json
 */
async function azureKeyVaultSecretProviderClassesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const result = await client.azureKeyVaultSecretProviderClasses.update(
    "rg-ssc-example",
    "akvspc-ssc-example",
    {
      tags: { "example-tag": "example-tag-value" },
      properties: {
        keyvaultName: "example-ssc-key-vault",
        cloudName: "AzurePublicCloud",
        clientId: "00000000-0000-0000-0000-000000000000",
        tenantId: "00000000-0000-0000-0000-000000000000",
        objects:
          "array: |\n  - |\n    objectName: my-secret-object\n    objectType: secret\n    objectVersionHistory: 1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureKeyVaultSecretProviderClassesUpdate();
}

main().catch(console.error);
