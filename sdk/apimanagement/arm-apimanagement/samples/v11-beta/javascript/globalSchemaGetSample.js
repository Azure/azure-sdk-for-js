// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the Schema specified by its identifier.
 *
 * @summary gets the details of the Schema specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGlobalSchema1.json
 */
async function apiManagementGetSchema1() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.globalSchema.get("rg1", "apimService1", "schema1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of the Schema specified by its identifier.
 *
 * @summary gets the details of the Schema specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGlobalSchema2.json
 */
async function apiManagementGetSchema2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.globalSchema.get("rg1", "apimService1", "schema2");
  console.log(result);
}

async function main() {
  await apiManagementGetSchema1();
  await apiManagementGetSchema2();
}

main().catch(console.error);
