// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the status of the most recent synchronization between the configuration database and the Git repository.
 *
 * @summary Gets the status of the most recent synchronization between the configuration database and the Git repository.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementTenantAccessSyncState.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementTenantAccessSyncState(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const configurationName = "configuration";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantConfiguration.getSyncState(
    resourceGroupName,
    serviceName,
    configurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementTenantAccessSyncState();
}

main().catch(console.error);
