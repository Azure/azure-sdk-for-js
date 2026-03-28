// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of authorization access policy defined within a authorization.
 *
 * @summary lists a collection of authorization access policy defined within a authorization.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListAuthorizationAccessPolicies.json
 */
async function apiManagementListAuthorizationAccessPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorizationAccessPolicy.listByAuthorization(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListAuthorizationAccessPolicies();
}

main().catch(console.error);
