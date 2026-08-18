// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update ExpressRouteLag tags or identity.
 *
 * @summary update ExpressRouteLag tags or identity.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagPatch.json
 */
async function updateExpressRouteLagTagsOrIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.update("rg1", "lagName", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/lagidentity":
          {},
      },
    },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateExpressRouteLagTagsOrIdentity();
}

main().catch(console.error);
