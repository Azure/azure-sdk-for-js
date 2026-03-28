// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Microsoft.ApiManagement resource running in the Virtual network to pick the updated DNS changes.
 *
 * @summary updates the Microsoft.ApiManagement resource running in the Virtual network to pick the updated DNS changes.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementApplyNetworkConfigurationUpdates.json
 */
async function apiManagementApplyNetworkConfigurationUpdates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.applyNetworkConfigurationUpdates(
    "rg1",
    "apimService1",
    { parameters: { location: "west us" } },
  );
  console.log(result);
}

async function main() {
  await apiManagementApplyNetworkConfigurationUpdates();
}

main().catch(console.error);
