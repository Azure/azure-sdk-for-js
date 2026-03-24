// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the policy restriction configuration of the Api Management service.
 *
 * @summary updates the policy restriction configuration of the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdatePolicyRestriction.json
 */
async function apiManagementUpdatePolicyRestriction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyRestriction.update(
    "rg1",
    "apimService1",
    "policyRestriction1",
    "*",
    { scope: "Sample Path 2 to the policy document." },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdatePolicyRestriction();
}

main().catch(console.error);
