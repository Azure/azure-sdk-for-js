// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing authorization policy within a profile.
 *
 * @summary gets an existing authorization policy within a profile.
 * x-ms-original-file: 2026-09-01-preview/AuthPolicies_Get.json
 */
async function authPoliciesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.authPolicies.get("RG", "profile1", "authPolicy1");
  console.log(result);
}

async function main() {
  await authPoliciesGet();
}

main().catch(console.error);
