// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the authorization access policy specified by its identifier.
 *
 * @summary gets the details of the authorization access policy specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetAuthorizationAccessPolicy.json
 */
async function apiManagementGetAuthorizationAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationAccessPolicy.get(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz1",
    "fe0bed83-631f-4149-bd0b-0464b1bc7cab",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetAuthorizationAccessPolicy();
}

main().catch(console.error);
