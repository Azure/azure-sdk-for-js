// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing security policy within profile.
 *
 * @summary deletes an existing security policy within profile.
 * x-ms-original-file: 2025-12-01/SecurityPolicies_Delete.json
 */
async function securityPoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.securityPolicies.delete("RG", "profile1", "securityPolicy1");
}

async function main() {
  await securityPoliciesDelete();
}

main().catch(console.error);
