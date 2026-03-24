// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all policy restrictions of API Management services.
 *
 * @summary gets all policy restrictions of API Management services.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListPolicyRestrictions.json
 */
async function apiManagementListPolicyRestrictions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyRestriction.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListPolicyRestrictions();
}

main().catch(console.error);
