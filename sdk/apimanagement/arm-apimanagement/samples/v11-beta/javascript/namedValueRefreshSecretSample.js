// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh the secret of the named value specified by its identifier.
 *
 * @summary refresh the secret of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshNamedValue.json
 */
async function apiManagementRefreshNamedValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.refreshSecret("rg1", "apimService1", "testprop2");
  console.log(result);
}

async function main() {
  await apiManagementRefreshNamedValue();
}

main().catch(console.error);
