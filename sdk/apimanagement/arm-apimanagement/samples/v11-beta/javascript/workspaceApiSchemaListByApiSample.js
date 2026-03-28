// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the schema configuration at the API level.
 *
 * @summary get the schema configuration at the API level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceApiSchemas.json
 */
async function apiManagementListWorkspaceApiSchemas() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceApiSchema.listByApi(
    "rg1",
    "apimService1",
    "wks1",
    "59d5b28d1f7fab116c282650",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListWorkspaceApiSchemas();
}

main().catch(console.error);
