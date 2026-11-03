// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Policy
 *
 * @summary deletes Policy
 * x-ms-original-file: 2025-11-01/WafPolicyDelete.json
 */
async function deleteProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.policies.delete("rg1", "Policy1");
}

async function main() {
  await deleteProtectionPolicy();
}

main().catch(console.error);
