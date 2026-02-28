// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an identity binding in the specified managed cluster.
 *
 * @summary deletes an identity binding in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/IdentityBindings_Delete.json
 */
async function deleteIdentityBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.identityBindings.delete("rg1", "clustername1", "identitybinding1");
}

async function main() {
  await deleteIdentityBinding();
}

main().catch(console.error);
