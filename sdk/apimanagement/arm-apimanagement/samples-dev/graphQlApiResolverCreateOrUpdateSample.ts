// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new resolver in the GraphQL API or updates an existing one.
 *
 * @summary Creates a new resolver in the GraphQL API or updates an existing one.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateGraphQLApiResolver.json
 */

import {
  ResolverContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateGraphQlApiResolver(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "someAPI";
  const resolverId = "newResolver";
  const parameters: ResolverContract = {
    path: "Query/users",
    description: "A GraphQL Resolver example",
    displayName: "Query Users",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolver.createOrUpdate(
    resourceGroupName,
    serviceName,
    apiId,
    resolverId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGraphQlApiResolver();
}

main().catch(console.error);
