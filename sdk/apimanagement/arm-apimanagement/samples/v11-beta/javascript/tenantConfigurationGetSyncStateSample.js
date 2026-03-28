// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of the most recent synchronization between the configuration database and the Git repository.
 *
 * @summary gets the status of the most recent synchronization between the configuration database and the Git repository.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementTenantAccessSyncState.json
 */
async function apiManagementTenantAccessSyncState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantConfiguration.getSyncState(
    "rg1",
    "apimService1",
    "configuration",
  );
  console.log(result);
}

async function main() {
  await apiManagementTenantAccessSyncState();
}

main().catch(console.error);
