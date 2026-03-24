// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate all policies of API Management services.
 *
 * @summary validate all policies of API Management services.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementValidatePolicies.json
 */
async function apiManagementListPolicyRestrictions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyRestrictionValidations.byService("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementListPolicyRestrictions();
}

main().catch(console.error);
