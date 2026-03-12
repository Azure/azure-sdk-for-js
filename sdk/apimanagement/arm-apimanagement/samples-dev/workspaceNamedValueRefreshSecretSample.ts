// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Refresh the secret of the named value specified by its identifier.
 *
 * @summary Refresh the secret of the named value specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementRefreshWorkspaceNamedValue.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementRefreshWorkspaceNamedValue(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const namedValueId = "testprop2";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.beginRefreshSecretAndWait(
    resourceGroupName,
    serviceName,
    workspaceId,
    namedValueId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementRefreshWorkspaceNamedValue();
}

main().catch(console.error);
