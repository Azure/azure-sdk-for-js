// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes specific authorization provider from the API Management service instance.
 *
 * @summary Deletes specific authorization provider from the API Management service instance.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteAuthorizationProvider.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteAuthorizationProvider(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithauthcode";
  const ifMatch = "*";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.delete(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    ifMatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteAuthorizationProvider();
}

main().catch(console.error);
