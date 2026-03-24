// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing logger.
 *
 * @summary updates an existing logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceLogger.json
 */
async function apiManagementUpdateWorkspaceLogger() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceLogger.update("rg1", "apimService1", "wks1", "eh1", "*", {
    description: "updating description",
    loggerType: "azureEventHub",
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateWorkspaceLogger();
}

main().catch(console.error);
