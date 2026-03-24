// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the policy configuration at the GraphQL Api Resolver.
 *
 * @summary deletes the policy configuration at the GraphQL Api Resolver.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGraphQLApiResolverPolicy.json
 */
async function apiManagementDeleteGraphQLApiResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.graphQLApiResolverPolicy.delete(
    "rg1",
    "apimService1",
    "testapi",
    "testResolver",
    "policy",
    "*",
  );
}

async function main() {
  await apiManagementDeleteGraphQLApiResolverPolicy();
}

main().catch(console.error);
