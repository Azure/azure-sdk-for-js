// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags and identity of an authentication policy.
 *
 * @summary updates the tags and identity of an authentication policy.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyUpdate.json
 */
async function updatesAuthenticationPolicyTagsAndIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.authenticationPolicies.update("rg1", "authPolicy1", {
    tags: { environment: "production" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
  });
  console.log(result);
}

async function main() {
  await updatesAuthenticationPolicyTagsAndIdentity();
}

main().catch(console.error);
