// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns operation results for long running operations executing DELETE or PATCH on the resource.
 *
 * @summary returns operation results for long running operations executing DELETE or PATCH on the resource.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetOperationResult.json
 */
async function apiManagementGetOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.operationsResults.get("westus2", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
}

async function main() {
  await apiManagementGetOperationResult();
}

main().catch(console.error);
