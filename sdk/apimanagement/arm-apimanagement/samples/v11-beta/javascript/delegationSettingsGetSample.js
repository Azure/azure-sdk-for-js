// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Delegation Settings for the Portal.
 *
 * @summary get Delegation Settings for the Portal.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsGetDelegation.json
 */
async function apiManagementPortalSettingsGetDelegation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.delegationSettings.get("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementPortalSettingsGetDelegation();
}

main().catch(console.error);
