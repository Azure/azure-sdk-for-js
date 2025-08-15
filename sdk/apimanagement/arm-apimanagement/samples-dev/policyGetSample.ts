// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PolicyGetOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the Global policy definition of the Api Management service.
 *
 * @summary Get the Global policy definition of the Api Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetPolicy.json
 */
async function apiManagementGetPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const policyId = "policy";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policy.get(
    resourceGroupName,
    serviceName,
    policyId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get the Global policy definition of the Api Management service.
 *
 * @summary Get the Global policy definition of the Api Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetPolicyFormat.json
 */
async function apiManagementGetPolicyFormat(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const policyId = "policy";
  const format = "rawxml";
  const options: PolicyGetOptionalParams = { format };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policy.get(
    resourceGroupName,
    serviceName,
    policyId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetPolicy();
  await apiManagementGetPolicyFormat();
}

main().catch(console.error);
