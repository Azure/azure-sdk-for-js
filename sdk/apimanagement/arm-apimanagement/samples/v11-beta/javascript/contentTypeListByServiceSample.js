// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the developer portal's content types. Content types describe content items' properties, validation rules, and constraints.
 *
 * @summary lists the developer portal's content types. Content types describe content items' properties, validation rules, and constraints.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListContentTypes.json
 */
async function apiManagementListContentTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contentType.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListContentTypes();
}

main().catch(console.error);
