// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates a commit with the current configuration snapshot to the specified branch in the repository. This is a long running operation and could take several minutes to complete.
 *
 * @summary this operation creates a commit with the current configuration snapshot to the specified branch in the repository. This is a long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementTenantConfigurationSave.json
 */
async function apiManagementTenantConfigurationSave() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantConfiguration.save("rg1", "apimService1", "configuration", {
    branch: "master",
  });
  console.log(result);
}

async function main() {
  await apiManagementTenantConfigurationSave();
}

main().catch(console.error);
