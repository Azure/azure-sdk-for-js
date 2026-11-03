// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an identity in the specified subscription and resource group.
 *
 * @summary update an identity in the specified subscription and resource group.
 * x-ms-original-file: 2025-05-31-preview/IdentityUpdate.json
 */
async function identityUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-5678-9012-123456789012";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const result = await client.userAssignedIdentities.update("rgName", "resourceName", {
    location: "eastus",
    tags: { key1: "value1", key2: "value2" },
    isolationScope: "Regional",
    assignmentRestrictions: { providers: ["Microsoft.Compute", "Microsoft.Storage/Accounts"] },
  });
  console.log(result);
}

async function main() {
  await identityUpdate();
}

main().catch(console.error);
