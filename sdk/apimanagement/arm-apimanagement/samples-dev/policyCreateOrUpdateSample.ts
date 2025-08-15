// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyContract, ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates the global policy configuration of the Api Management service.
 *
 * @summary Creates or updates the global policy configuration of the Api Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreatePolicy.json
 */
async function apiManagementCreatePolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const policyId = "policy";
  const parameters: PolicyContract = {
    format: "xml",
    value:
      "<policies>\r\n  <inbound />\r\n  <backend>\r\n    <forward-request />\r\n  </backend>\r\n  <outbound />\r\n</policies>",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policy.createOrUpdate(
    resourceGroupName,
    serviceName,
    policyId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreatePolicy();
}

main().catch(console.error);
