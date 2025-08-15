// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get Delegation Settings for the Portal.
 *
 * @summary Get Delegation Settings for the Portal.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementPortalSettingsGetDelegation.json
 */
async function apiManagementPortalSettingsGetDelegation(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.delegationSettings.get(
    resourceGroupName,
    serviceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsGetDelegation();
}

main().catch(console.error);
