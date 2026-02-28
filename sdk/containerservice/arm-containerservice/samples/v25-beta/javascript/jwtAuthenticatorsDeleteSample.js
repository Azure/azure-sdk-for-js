// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a JWT authenticator and updates the managed cluster to apply the settings.
 *
 * @summary deletes a JWT authenticator and updates the managed cluster to apply the settings.
 * x-ms-original-file: 2025-10-02-preview/JWTAuthenticators_Delete.json
 */
async function deleteJWTAuthenticator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.jwtAuthenticators.delete("rg1", "clustername1", "jwt1");
}

async function main() {
  await deleteJWTAuthenticator();
}

main().catch(console.error);
