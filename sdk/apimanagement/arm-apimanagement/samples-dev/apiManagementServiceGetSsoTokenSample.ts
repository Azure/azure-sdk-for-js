// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the Single-Sign-On token for the API Management Service which is valid for 5 Minutes.
 *
 * @summary Gets the Single-Sign-On token for the API Management Service which is valid for 5 Minutes.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementServiceGetSsoToken.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementServiceGetSsoToken(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.getSsoToken(
    resourceGroupName,
    serviceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceGetSsoToken();
}

main().catch(console.error);
