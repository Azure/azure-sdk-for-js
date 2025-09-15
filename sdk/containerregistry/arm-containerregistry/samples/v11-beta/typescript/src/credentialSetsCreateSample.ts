// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a credential set for a container registry with the specified parameters.
 *
 * @summary creates a credential set for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/CredentialSetCreate.json
 */
async function credentialSetCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentialSets.create(
    "myResourceGroup",
    "myRegistry",
    "myCredentialSet",
    {
      identity: { type: "SystemAssigned" },
      properties: {
        authCredentials: [
          {
            name: "Credential1",
            passwordSecretIdentifier: "https://myvault.vault.azure.net/secrets/password",
            usernameSecretIdentifier: "https://myvault.vault.azure.net/secrets/username",
          },
        ],
        loginServer: "docker.io",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await credentialSetCreate();
}

main().catch(console.error);
