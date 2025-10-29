// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a credential set for a container registry with the specified parameters.
 *
 * @summary updates a credential set for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/CredentialSetUpdate.json
 */
async function credentialSetUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentialSets.update(
    "myResourceGroup",
    "myRegistry",
    "myCredentialSet",
    {
      properties: {
        authCredentials: [
          {
            name: "Credential1",
            usernameSecretIdentifier: "https://myvault.vault.azure.net/secrets/username2",
            passwordSecretIdentifier: "https://myvault.vault.azure.net/secrets/password2",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await credentialSetUpdate();
}

main().catch(console.error);
