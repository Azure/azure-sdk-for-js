// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a credential set for a container registry with the specified parameters.
 *
 * @summary creates a credential set for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/CredentialSetCreate.json
 */
async function credentialSetCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentialSets.create(
    "myResourceGroup",
    "myRegistry",
    "myCredentialSet",
    {
      properties: {
        loginServer: "docker.io",
        authCredentials: [
          {
            name: "Credential1",
            usernameSecretIdentifier: "https://myvault.vault.azure.net/secrets/username",
            passwordSecretIdentifier: "https://myvault.vault.azure.net/secrets/password",
          },
        ],
      },
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main() {
  await credentialSetCreate();
}

main().catch(console.error);
