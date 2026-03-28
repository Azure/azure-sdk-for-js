// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified tool in the API.
 *
 * @summary deletes the specified tool in the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiTool.json
 */
async function apiManagementDeleteApiTool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiTool.delete(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
  );
}

async function main() {
  await apiManagementDeleteApiTool();
}

main().catch(console.error);
