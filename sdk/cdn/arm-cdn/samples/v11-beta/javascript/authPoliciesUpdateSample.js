// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing authorization policy within a profile.
 *
 * @summary updates an existing authorization policy within a profile.
 * x-ms-original-file: 2026-09-01-preview/AuthPolicies_Update.json
 */
async function authPoliciesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.authPolicies.update("RG", "profile1", "authPolicy1", {
    action: "Log",
    forwardTokenToOrigin: false,
  });
  console.log(result);
}

async function main() {
  await authPoliciesUpdate();
}

main().catch(console.error);
