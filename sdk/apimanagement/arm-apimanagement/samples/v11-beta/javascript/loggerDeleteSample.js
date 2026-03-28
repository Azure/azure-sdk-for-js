// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified logger.
 *
 * @summary deletes the specified logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteLogger.json
 */
async function apiManagementDeleteLogger() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.logger.delete("rg1", "apimService1", "loggerId", "*");
}

async function main() {
  await apiManagementDeleteLogger();
}

main().catch(console.error);
