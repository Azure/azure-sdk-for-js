// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates primary key of existing subscription of the API Management service instance.
 *
 * @summary regenerates primary key of existing subscription of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementSubscriptionRegeneratePrimaryKey.json
 */
async function apiManagementSubscriptionRegeneratePrimaryKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.subscription.regeneratePrimaryKey("rg1", "apimService1", "testsub");
}

async function main() {
  await apiManagementSubscriptionRegeneratePrimaryKey();
}

main().catch(console.error);
