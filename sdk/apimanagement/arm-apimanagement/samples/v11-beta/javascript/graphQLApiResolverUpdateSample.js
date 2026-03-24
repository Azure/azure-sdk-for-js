// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the resolver in the GraphQL API specified by its identifier.
 *
 * @summary updates the details of the resolver in the GraphQL API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateGraphQLApiResolver.json
 */
async function apiManagementUpdateGraphQLApiResolver() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolver.update(
    "rg1",
    "apimService1",
    "echo-api",
    "resolverId",
    "*",
    {
      path: "Query/adminUsers",
      description: "A GraphQL Resolver example",
      displayName: "Query AdminUsers",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateGraphQLApiResolver();
}

main().catch(console.error);
