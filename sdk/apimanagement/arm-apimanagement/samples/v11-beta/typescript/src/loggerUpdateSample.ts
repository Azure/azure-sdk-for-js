// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing logger.
 *
 * @summary updates an existing logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateLogger.json
 */
async function apiManagementUpdateLogger(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.logger.update("rg1", "apimService1", "eh1", "*", {
    description: "updating description",
    loggerType: "azureEventHub",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateLogger();
}

main().catch(console.error);
