// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the GraphQL API resolver policy specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the GraphQL API resolver policy specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadGraphQLApiResolverPolicy.json
 */
async function apiManagementHeadGraphQLApiResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.graphQLApiResolverPolicy.getEntityTag(
    "rg1",
    "apimService1",
    "5600b539c53f5b0062040001",
    "5600b53ac53f5b0062080006",
    "policy",
  );
}

async function main() {
  await apiManagementHeadGraphQLApiResolverPolicy();
}

main().catch(console.error);
