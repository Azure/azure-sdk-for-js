// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new resolver in the GraphQL API or updates an existing one.
 *
 * @summary creates a new resolver in the GraphQL API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGraphQLApiResolver.json
 */
async function apiManagementCreateGraphQLApiResolver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolver.createOrUpdate(
    "rg1",
    "apimService1",
    "someAPI",
    "newResolver",
    { path: "Query/users", description: "A GraphQL Resolver example", displayName: "Query Users" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGraphQLApiResolver();
}

main().catch(console.error);
