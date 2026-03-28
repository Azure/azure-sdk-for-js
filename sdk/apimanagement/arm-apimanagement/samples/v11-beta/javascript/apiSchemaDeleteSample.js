// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the schema configuration at the Api.
 *
 * @summary deletes the schema configuration at the Api.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiSchema.json
 */
async function apiManagementDeleteApiSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiSchema.delete(
    "rg1",
    "apimService1",
    "59d5b28d1f7fab116c282650",
    "59d5b28e1f7fab116402044e",
    "*",
  );
}

async function main() {
  await apiManagementDeleteApiSchema();
}

main().catch(console.error);
