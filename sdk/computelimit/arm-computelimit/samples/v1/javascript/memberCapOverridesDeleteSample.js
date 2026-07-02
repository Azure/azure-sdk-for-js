// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the per-member cap override for a member subscription.
 *
 * @summary removes the per-member cap override for a member subscription.
 * x-ms-original-file: 2026-07-01/MemberCapOverrides_Delete.json
 */
async function deleteASingleMemberCapOverride() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  await client.memberCapOverrides.delete(
    "eastus",
    "StandardDSv3Family",
    "11111111-1111-1111-1111-111111111111",
  );
}

async function main() {
  await deleteASingleMemberCapOverride();
}

main().catch(console.error);
