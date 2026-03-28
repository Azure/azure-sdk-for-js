// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the schema configuration at the API level.
 *
 * @summary get the schema configuration at the API level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiSchema.json
 */
async function apiManagementGetWorkspaceApiSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiSchema.get(
    "rg1",
    "apimService1",
    "wks1",
    "59d6bb8f1f7fab13dc67ec9b",
    "ec12520d-9d48-4e7b-8f39-698ca2ac63f1",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetWorkspaceApiSchema();
}

main().catch(console.error);
