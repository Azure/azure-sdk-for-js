// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of named values defined within a workspace in a service instance.
 *
 * @summary lists a collection of named values defined within a workspace in a service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceNamedValues.json
 */
async function apiManagementListWorkspaceNamedValues() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceNamedValue.listByService(
    "rg1",
    "apimService1",
    "wks1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListWorkspaceNamedValues();
}

main().catch(console.error);
