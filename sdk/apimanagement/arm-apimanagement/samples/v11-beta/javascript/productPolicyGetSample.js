// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the policy configuration at the Product level.
 *
 * @summary get the policy configuration at the Product level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetProductPolicy.json
 */
async function apiManagementGetProductPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productPolicy.get(
    "rg1",
    "apimService1",
    "kjoshiarmTemplateProduct4",
    "policy",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetProductPolicy();
}

main().catch(console.error);
