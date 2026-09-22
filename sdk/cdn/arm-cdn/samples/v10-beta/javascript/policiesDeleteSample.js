// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Policy
 *
 * @summary deletes Policy
 * x-ms-original-file: 2025-12-01/WafPolicyDelete.json
 */
async function deleteProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.policies.delete("rg1", "Policy1");
}

async function main() {
  await deleteProtectionPolicy();
}

main().catch(console.error);
