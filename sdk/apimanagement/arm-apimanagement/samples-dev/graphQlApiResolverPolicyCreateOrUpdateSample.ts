// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates policy configuration for the GraphQL API Resolver level.
 *
 * @summary Creates or updates policy configuration for the GraphQL API Resolver level.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateGraphQLApiResolverPolicy.json
 */

import {
  PolicyContract,
  GraphQLApiResolverPolicyCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateGraphQlApiResolverPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "5600b57e7e8880006a040001";
  const resolverId = "5600b57e7e8880006a080001";
  const policyId = "policy";
  const ifMatch = "*";
  const parameters: PolicyContract = {
    format: "xml",
    value:
      '<http-data-source><http-request><set-method>GET</set-method><set-backend-service base-url="https://some.service.com" /><set-url>/api/users</set-url></http-request></http-data-source>',
  };
  const options: GraphQLApiResolverPolicyCreateOrUpdateOptionalParams = {
    ifMatch,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.graphQLApiResolverPolicy.createOrUpdate(
    resourceGroupName,
    serviceName,
    apiId,
    resolverId,
    policyId,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGraphQlApiResolverPolicy();
}

main().catch(console.error);
