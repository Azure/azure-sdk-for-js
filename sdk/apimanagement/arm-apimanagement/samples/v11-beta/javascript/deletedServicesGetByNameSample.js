// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get soft-deleted Api Management Service by name.
 *
 * @summary get soft-deleted Api Management Service by name.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetDeletedServiceByName.json
 */
async function apiManagementGetDeletedServiceByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.deletedServices.getByName("westus", "apimService3");
  console.log(result);
}

async function main() {
  await apiManagementGetDeletedServiceByName();
}

main().catch(console.error);
