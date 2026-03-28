// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the policy configuration at the API level.
 *
 * @summary get the policy configuration at the API level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiPolicies.json
 */
async function apiManagementListApiPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiPolicy.listByApi(
    "rg1",
    "apimService1",
    "5600b59475ff190048040001",
  );
  console.log(result);
}

async function main() {
  await apiManagementListApiPolicies();
}

main().catch(console.error);
