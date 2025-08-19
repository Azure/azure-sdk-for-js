// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BackendUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing backend.
 *
 * @summary Updates an existing backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateWorkspaceBackend.json
 */
async function apiManagementUpdateWorkspaceBackend(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const backendId = "proxybackend";
  const ifMatch = "*";
  const parameters: BackendUpdateParameters = {
    description: "description5308",
    tls: { validateCertificateChain: false, validateCertificateName: true },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceBackend.update(
    resourceGroupName,
    serviceName,
    workspaceId,
    backendId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateWorkspaceBackend();
}

main().catch(console.error);
