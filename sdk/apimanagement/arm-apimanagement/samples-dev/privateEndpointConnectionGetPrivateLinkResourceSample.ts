// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the private link resources
 *
 * @summary Gets the private link resources
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetPrivateLinkGroupResource.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetPrivateLinkGroupResource(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const privateLinkSubResourceName = "privateLinkSubResourceName";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.privateEndpointConnectionOperations.getPrivateLinkResource(
      resourceGroupName,
      serviceName,
      privateLinkSubResourceName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetPrivateLinkGroupResource();
}

main().catch(console.error);
