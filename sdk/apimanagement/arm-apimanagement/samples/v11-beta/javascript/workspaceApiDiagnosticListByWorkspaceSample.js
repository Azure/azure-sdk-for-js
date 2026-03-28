// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all diagnostics of an API.
 *
 * @summary lists all diagnostics of an API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceApiDiagnostics.json
 */
async function apiManagementListWorkspaceApiDiagnostics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceApiDiagnostic.listByWorkspace(
    "rg1",
    "apimService1",
    "wks1",
    "echo-api",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListWorkspaceApiDiagnostics();
}

main().catch(console.error);
