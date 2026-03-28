// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a logger.
 *
 * @summary creates or Updates a logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceAILogger.json
 */
async function apiManagementCreateWorkspaceAILogger(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceLogger.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "loggerId",
    {
      description: "adding a new logger",
      credentials: { instrumentationKey: "11................a1" },
      loggerType: "applicationInsights",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a logger.
 *
 * @summary creates or Updates a logger.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceEHLogger.json
 */
async function apiManagementCreateWorkspaceEHLogger(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceLogger.createOrUpdate("rg1", "apimService1", "wks1", "eh1", {
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
  await apiManagementCreateWorkspaceAILogger();
  await apiManagementCreateWorkspaceEHLogger();
}

main().catch(console.error);
