// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the list of policy configuration at the GraphQL API Resolver level.
 *
 * @summary get the list of policy configuration at the GraphQL API Resolver level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGraphQLApiResolverPolicies.json
 */
async function apiManagementListGraphQLApiResolverPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.graphQLApiResolverPolicy.listByResolver(
    "rg1",
    "apimService1",
    "599e2953193c3c0bd0b3e2fa",
    "599e29ab193c3c0bd0b3e2fb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListGraphQLApiResolverPolicies();
}

main().catch(console.error);
