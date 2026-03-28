// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a logger.
 *
 * @summary creates or Updates a logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAILogger.json
 */
async function apiManagementCreateAILogger(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.logger.createOrUpdate("rg1", "apimService1", "loggerId", {
    description: "adding a new logger",
    credentials: { instrumentationKey: "11................a1" },
    loggerType: "applicationInsights",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a logger.
 *
 * @summary creates or Updates a logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateEHLogger.json
 */
async function apiManagementCreateEHLogger(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.logger.createOrUpdate("rg1", "apimService1", "eh1", {
    description: "adding a new logger",
    credentials: {
      name: "hydraeventhub",
      connectionString:
        "Endpoint=sb://hydraeventhub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=********=",
    },
    loggerType: "azureEventHub",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateAILogger();
  await apiManagementCreateEHLogger();
}

main().catch(console.error);
