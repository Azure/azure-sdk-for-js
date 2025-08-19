// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the configuration details of the identity Provider configured in specified service instance.
 *
 * @summary Gets the configuration details of the identity Provider configured in specified service instance.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetIdentityProvider.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetIdentityProvider(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const identityProviderName = "aadB2C";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.get(
    resourceGroupName,
    serviceName,
    identityProviderName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetIdentityProvider();
}

main().catch(console.error);
