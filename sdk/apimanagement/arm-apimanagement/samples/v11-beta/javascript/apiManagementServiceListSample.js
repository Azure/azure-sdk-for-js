// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all API Management services within an Azure subscription.
 *
 * @summary lists all API Management services within an Azure subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListServiceBySubscription.json
 */
async function apiManagementListServiceBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiManagementService.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListServiceBySubscription();
}

main().catch(console.error);
