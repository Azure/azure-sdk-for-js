// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to applies the identity binding profile to the selected fleet members, creating, updating or deleting the corresponding managedClusters/identityBindings resources.
 *
 * @summary applies the identity binding profile to the selected fleet members, creating, updating or deleting the corresponding managedClusters/identityBindings resources.
 * x-ms-original-file: 2026-11-02-preview/IdentityBindingProfiles_Apply.json
 */
async function applyAnIdentityBindingProfileToTheSelectedMembers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.identityBindingProfiles.apply("rg1", "fleet1", "identitybinding1");
  console.log(result);
}

async function main() {
  await applyAnIdentityBindingProfileToTheSelectedMembers();
}

main().catch(console.error);
