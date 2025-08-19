// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes specific access policy from the Authorization.
 *
 * @summary Deletes specific access policy from the Authorization.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteAuthorizationAccessPolicy.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteAuthorizationAccessPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithauthcode";
  const authorizationId = "authz1";
  const authorizationAccessPolicyId = "fe0bed83-631f-4149-bd0b-0464b1bc7cab";
  const ifMatch = "*";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationAccessPolicy.delete(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    authorizationAccessPolicyId,
    ifMatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteAuthorizationAccessPolicy();
}

main().catch(console.error);
