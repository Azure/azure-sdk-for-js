// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an identity in the specified subscription and resource group.
 *
 * @summary create or update an identity in the specified subscription and resource group.
 * x-ms-original-file: 2025-05-31-preview/IdentityCreate.json
 */
async function identityCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-5678-9012-123456789012";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const result = await client.userAssignedIdentities.createOrUpdate("rgName", "resourceName", {
    location: "eastus",
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await identityCreate();
}

main().catch(console.error);
