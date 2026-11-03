// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing authorization policy within a profile.
 *
 * @summary deletes an existing authorization policy within a profile.
 * x-ms-original-file: 2026-09-01-preview/AuthPolicies_Delete.json
 */
async function authPoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.authPolicies.delete("RG", "profile1", "authPolicy1");
}

async function main() {
  await authPoliciesDelete();
}

main().catch(console.error);
