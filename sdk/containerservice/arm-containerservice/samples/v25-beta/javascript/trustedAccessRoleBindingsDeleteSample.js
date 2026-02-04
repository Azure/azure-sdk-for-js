// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a trusted access role binding.
 *
 * @summary delete a trusted access role binding.
 * x-ms-original-file: 2025-10-02-preview/TrustedAccessRoleBindings_Delete.json
 */
async function deleteATrustedAccessRoleBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.trustedAccessRoleBindings.delete("rg1", "clustername1", "binding1");
}

async function main() {
  await deleteATrustedAccessRoleBinding();
}

main().catch(console.error);
