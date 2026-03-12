// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the custom domain ownership identifier for an API Management service.
 *
 * @summary Get the custom domain ownership identifier for an API Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementServiceGetDomainOwnershipIdentifier.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementServiceGetDomainOwnershipIdentifier(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.apiManagementService.getDomainOwnershipIdentifier();
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceGetDomainOwnershipIdentifier();
}

main().catch(console.error);
