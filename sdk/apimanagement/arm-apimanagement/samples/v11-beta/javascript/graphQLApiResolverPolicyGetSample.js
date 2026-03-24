// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the policy configuration at the GraphQL API Resolver level.
 *
 * @summary get the policy configuration at the GraphQL API Resolver level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGraphQLApiResolverPolicy.json
 */
async function apiManagementGetGraphQLApiResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolverPolicy.get(
    "rg1",
    "apimService1",
    "5600b539c53f5b0062040001",
    "5600b53ac53f5b0062080006",
    "policy",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetGraphQLApiResolverPolicy();
}

main().catch(console.error);
