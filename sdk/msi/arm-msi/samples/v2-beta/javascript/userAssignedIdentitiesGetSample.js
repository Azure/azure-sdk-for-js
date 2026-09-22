// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the identity.
 *
 * @summary gets the identity.
 * x-ms-original-file: 2025-05-31-preview/IdentityGet.json
 */
async function identityGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-5678-9012-123456789012";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const result = await client.userAssignedIdentities.get("rgName", "resourceName");
  console.log(result);
}

async function main() {
  await identityGet();
}

main().catch(console.error);
