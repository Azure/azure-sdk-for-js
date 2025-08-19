// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates one of the login credentials for the specified container registry.
 *
 * @summary Regenerates one of the login credentials for the specified container registry.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/RegistryRegenerateCredential.json
 */

import {
  RegenerateCredentialParameters,
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function registryRegenerateCredential(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const regenerateCredentialParameters: RegenerateCredentialParameters = {
    name: "password",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.regenerateCredential(
    resourceGroupName,
    registryName,
    regenerateCredentialParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registryRegenerateCredential();
}

main().catch(console.error);
