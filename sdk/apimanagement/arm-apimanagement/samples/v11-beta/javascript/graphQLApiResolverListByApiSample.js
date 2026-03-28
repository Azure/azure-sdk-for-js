// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of the resolvers for the specified GraphQL API.
 *
 * @summary lists a collection of the resolvers for the specified GraphQL API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGraphQLApiResolvers.json
 */
async function apiManagementListGraphQLApiResolvers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.graphQLApiResolver.listByApi(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListGraphQLApiResolvers();
}

main().catch(console.error);
