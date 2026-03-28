// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the API Operation specified by its identifier.
 *
 * @summary gets the details of the API Operation specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiOperation.json
 */
async function apiManagementGetWorkspaceApiOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiOperation.get(
    "rg1",
    "apimService1",
    "wks1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetWorkspaceApiOperation();
}

main().catch(console.error);
