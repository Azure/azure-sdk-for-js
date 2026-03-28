// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Gateway to be used in Api Management instance.
 *
 * @summary creates or updates a Gateway to be used in Api Management instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGateway.json
 */
async function apiManagementCreateGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.createOrUpdate("rg1", "apimService1", "gw1", {
    description: "my gateway 1",
    locationData: { name: "my location" },
  });
  console.log(result);
}

async function main() {
  await apiManagementCreateGateway();
}

main().catch(console.error);
