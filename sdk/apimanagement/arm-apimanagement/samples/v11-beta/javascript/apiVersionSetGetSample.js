// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the Api Version Set specified by its identifier.
 *
 * @summary gets the details of the Api Version Set specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiVersionSet.json
 */
async function apiManagementGetApiVersionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiVersionSet.get("rg1", "apimService1", "vs1");
  console.log(result);
}

async function main() {
  await apiManagementGetApiVersionSet();
}

main().catch(console.error);
