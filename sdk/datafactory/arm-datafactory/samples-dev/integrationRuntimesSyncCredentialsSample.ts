// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to force the integration runtime to synchronize credentials across integration runtime nodes, and this will override the credentials across all worker nodes with those available on the dispatcher node. If you already have the latest credential backup file, you should manually import it (preferred) on any self-hosted integration runtime node than using this API directly.
 *
 * @summary force the integration runtime to synchronize credentials across integration runtime nodes, and this will override the credentials across all worker nodes with those available on the dispatcher node. If you already have the latest credential backup file, you should manually import it (preferred) on any self-hosted integration runtime node than using this API directly.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_SyncCredentials.json
 */
async function integrationRuntimesSyncCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.syncCredentials(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
}

async function main(): Promise<void> {
  await integrationRuntimesSyncCredentials();
}

main().catch(console.error);
