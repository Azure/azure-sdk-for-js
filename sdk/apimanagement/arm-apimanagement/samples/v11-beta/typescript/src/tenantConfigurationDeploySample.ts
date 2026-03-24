// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete.
 *
 * @summary this operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementTenantConfigurationDeploy.json
 */
async function apiManagementTenantConfigurationDeploy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantConfiguration.deploy("rg1", "apimService1", "configuration", {
    branch: "master",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementTenantConfigurationDeploy();
}

main().catch(console.error);
