// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the developer portal's content type. Content types describe content items' properties, validation rules, and constraints.
 *
 * @summary gets the details of the developer portal's content type. Content types describe content items' properties, validation rules, and constraints.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetContentType.json
 */
async function apiManagementGetContentType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.contentType.get("rg1", "apimService1", "page");
  console.log(result);
}

async function main() {
  await apiManagementGetContentType();
}

main().catch(console.error);
