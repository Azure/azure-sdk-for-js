// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the API specified by its identifier.
 *
 * @summary gets the details of the API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiContract.json
 */
async function apiManagementGetWorkspaceApiContract() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.get(
    "rg1",
    "apimService1",
    "wks1",
    "57d1f7558aa04f15146d9d8a",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of the API specified by its identifier.
 *
 * @summary gets the details of the API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiRevision.json
 */
async function apiManagementGetWorkspaceApiRevision() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.get("rg1", "apimService1", "wks1", "echo-api;rev=3");
  console.log(result);
}

async function main() {
  await apiManagementGetWorkspaceApiContract();
  await apiManagementGetWorkspaceApiRevision();
}

main().catch(console.error);
