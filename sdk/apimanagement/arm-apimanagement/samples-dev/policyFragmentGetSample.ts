// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a policy fragment.
 *
 * @summary Gets a policy fragment.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetPolicyFragment.json
 */

import {
  PolicyFragmentGetOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetPolicyFragment(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const id = "policyFragment1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyFragment.get(
    resourceGroupName,
    serviceName,
    id,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a policy fragment.
 *
 * @summary Gets a policy fragment.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetPolicyFragmentFormat.json
 */
async function apiManagementGetPolicyFragmentFormat(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const id = "policyFragment1";
  const format = "rawxml";
  const options: PolicyFragmentGetOptionalParams = { format };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyFragment.get(
    resourceGroupName,
    serviceName,
    id,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetPolicyFragment();
  await apiManagementGetPolicyFragmentFormat();
}

main().catch(console.error);
