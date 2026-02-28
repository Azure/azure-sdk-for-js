// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a JWT authenticator and updates the managed cluster to apply the settings.
 *
 * @summary deletes a JWT authenticator and updates the managed cluster to apply the settings.
 * x-ms-original-file: 2025-10-02-preview/JWTAuthenticators_Delete.json
 */
async function deleteJWTAuthenticator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.jwtAuthenticators.delete("rg1", "clustername1", "jwt1");
}

async function main(): Promise<void> {
  await deleteJWTAuthenticator();
}

main().catch(console.error);
