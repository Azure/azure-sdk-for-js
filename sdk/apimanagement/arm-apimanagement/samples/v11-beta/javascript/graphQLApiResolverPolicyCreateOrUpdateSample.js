// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates policy configuration for the GraphQL API Resolver level.
 *
 * @summary creates or updates policy configuration for the GraphQL API Resolver level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGraphQLApiResolverPolicy.json
 */
async function apiManagementCreateGraphQLApiResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolverPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "5600b57e7e8880006a040001",
    "5600b57e7e8880006a080001",
    "policy",
    {
      format: "xml",
      value:
        '<http-data-source><http-request><set-method>GET</set-method><set-backend-service base-url="https://some.service.com" /><set-url>/api/users</set-url></http-request></http-data-source>',
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateGraphQLApiResolverPolicy();
}

main().catch(console.error);
