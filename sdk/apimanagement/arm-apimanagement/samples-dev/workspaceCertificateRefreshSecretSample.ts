// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to From KeyVault, Refresh the certificate being used for authentication with the backend.
 *
 * @summary From KeyVault, Refresh the certificate being used for authentication with the backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementRefreshWorkspaceCertificate.json
 */
async function apiManagementRefreshWorkspaceCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const certificateId = "templateCertkv";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceCertificate.refreshSecret(
    resourceGroupName,
    serviceName,
    workspaceId,
    certificateId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementRefreshWorkspaceCertificate();
}

main().catch(console.error);
