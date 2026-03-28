// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the policy configuration at the Product level.
 *
 * @summary get the policy configuration at the Product level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListProductPolicies.json
 */
async function apiManagementListProductPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productPolicy.listByProduct(
    "rg1",
    "apimService1",
    "armTemplateProduct4",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListProductPolicies();
}

main().catch(console.error);
