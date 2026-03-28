// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of client applications in the specified service instance.
 *
 * @summary lists a collection of client applications in the specified service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListClientApplications.json
 */
async function apiManagementListProducts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clientApplication.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListProducts();
}

main().catch(console.error);
