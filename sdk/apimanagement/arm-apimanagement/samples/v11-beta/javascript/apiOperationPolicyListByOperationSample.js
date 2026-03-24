// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of policy configuration at the API Operation level.
 *
 * @summary get the list of policy configuration at the API Operation level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiOperationPolicies.json
 */
async function apiManagementListApiOperationPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperationPolicy.listByOperation(
    "rg1",
    "apimService1",
    "599e2953193c3c0bd0b3e2fa",
    "599e29ab193c3c0bd0b3e2fb",
  );
  console.log(result);
}

async function main() {
  await apiManagementListApiOperationPolicies();
}

main().catch(console.error);
