// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the identity.
 *
 * @summary deletes the identity.
 * x-ms-original-file: 2025-05-31-preview/IdentityDelete.json
 */
async function identityDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-5678-9012-123456789012";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  await client.userAssignedIdentities.delete("rgName", "resourceName");
}

async function main(): Promise<void> {
  await identityDelete();
}

main().catch(console.error);
