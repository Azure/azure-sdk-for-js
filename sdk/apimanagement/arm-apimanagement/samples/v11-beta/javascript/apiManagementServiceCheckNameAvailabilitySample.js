// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks availability and correctness of a name for an API Management service.
 *
 * @summary checks availability and correctness of a name for an API Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceCheckNameAvailability.json
 */
async function apiManagementServiceCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.checkNameAvailability({ name: "apimService1" });
  console.log(result);
}

async function main() {
  await apiManagementServiceCheckNameAvailability();
}

main().catch(console.error);
