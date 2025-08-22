// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the details of the resolver in the GraphQL API specified by its identifier.
 *
 * @summary Updates the details of the resolver in the GraphQL API specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateGraphQLApiResolver.json
 */

import {
  ResolverUpdateContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdateGraphQlApiResolver(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "echo-api";
  const resolverId = "resolverId";
  const ifMatch = "*";
  const parameters: ResolverUpdateContract = {
    path: "Query/adminUsers",
    description: "A GraphQL Resolver example",
    displayName: "Query AdminUsers",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolver.update(
    resourceGroupName,
    serviceName,
    apiId,
    resolverId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateGraphQlApiResolver();
}

main().catch(console.error);
