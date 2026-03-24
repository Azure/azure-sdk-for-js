// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the release of the API specified by its identifier.
 *
 * @summary updates the details of the release of the API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateApiRelease.json
 */
async function apiManagementUpdateApiRelease() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiRelease.update("rg1", "apimService1", "a1", "testrev", "*", {
    apiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/a1",
    notes: "yahooagain",
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateApiRelease();
}

main().catch(console.error);
