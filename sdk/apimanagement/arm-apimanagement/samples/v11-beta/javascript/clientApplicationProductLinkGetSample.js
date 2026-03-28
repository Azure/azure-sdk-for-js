// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the product link for the client application.
 *
 * @summary gets the product link for the client application.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetClientApplicationProductLink.json
 */
async function apiManagementGetProductApiLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.clientApplicationProductLink.get(
    "rg1",
    "apimService1",
    "testAppId",
    "link1",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetProductApiLink();
}

main().catch(console.error);
