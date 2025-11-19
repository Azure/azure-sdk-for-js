// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CredentialSet} from "@azure/arm-containerregistry";
import {
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a credential set for a container registry with the specified parameters.
 *
 * @summary Creates a credential set for a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/CredentialSetCreate.json
 */
async function credentialSetCreate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const credentialSetName = "myCredentialSet";
  const credentialSetCreateParameters: CredentialSet = {
    authCredentials: [
      {
        name: "Credential1",
        passwordSecretIdentifier:
          "https://myvault.vault.azure.net/secrets/password",
        usernameSecretIdentifier:
          "https://myvault.vault.azure.net/secrets/username",
      },
    ],
    identity: { type: "SystemAssigned" },
    loginServer: "docker.io",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.credentialSets.beginCreateAndWait(
    resourceGroupName,
    registryName,
    credentialSetName,
    credentialSetCreateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await credentialSetCreate();
}

main().catch(console.error);
