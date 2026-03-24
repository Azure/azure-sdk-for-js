// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of product links associated with the specified client application.
 *
 * @summary lists a collection of product links associated with the specified client application.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListClientApplicationProductLinks.json
 */
async function apiManagementListProducts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clientApplicationProductLink.listByClientApplications(
    "rg1",
    "apimService1",
    "testAppId",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListProducts();
}

main().catch(console.error);
