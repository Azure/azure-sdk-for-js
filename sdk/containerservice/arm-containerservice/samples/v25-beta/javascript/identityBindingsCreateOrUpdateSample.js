// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an identity binding in the specified managed cluster.
 *
 * @summary creates or updates an identity binding in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/IdentityBindings_Create_Or_Update.json
 */
async function createOrUpdateIdentityBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.identityBindings.createOrUpdate(
    "rg1",
    "clustername1",
    "identitybinding1",
    {
      properties: {
        managedIdentity: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateIdentityBinding();
}

main().catch(console.error);
