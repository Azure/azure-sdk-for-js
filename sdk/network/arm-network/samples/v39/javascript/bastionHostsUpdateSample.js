// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates Tags or identity for BastionHost resource
 *
 * @summary updates Tags or identity for BastionHost resource
 * x-ms-original-file: 2026-01-01/BastionHostPatch.json
 */
async function patchBastionHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.update("rg1", "bastionhosttenant", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/bastionidentity":
          {},
      },
    },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await patchBastionHost();
}

main().catch(console.error);
