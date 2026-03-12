// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates policy configuration for the API Operation level.
 *
 * @summary Creates or updates policy configuration for the API Operation level.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateApiOperationPolicy.json
 */

import {
  PolicyContract,
  ApiOperationPolicyCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateApiOperationPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "5600b57e7e8880006a040001";
  const operationId = "5600b57e7e8880006a080001";
  const policyId = "policy";
  const ifMatch = "*";
  const parameters: PolicyContract = {
    format: "xml",
    value:
      "<policies> <inbound /> <backend>    <forward-request />  </backend>  <outbound /></policies>",
  };
  const options: ApiOperationPolicyCreateOrUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperationPolicy.createOrUpdate(
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    policyId,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiOperationPolicy();
}

main().catch(console.error);
