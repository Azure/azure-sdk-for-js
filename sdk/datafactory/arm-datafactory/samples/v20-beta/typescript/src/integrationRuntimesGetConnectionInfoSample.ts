// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the on-premises integration runtime connection information for encrypting the on-premises data source credentials.
 *
 * @summary gets the on-premises integration runtime connection information for encrypting the on-premises data source credentials.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_GetConnectionInfo.json
 */
async function integrationRuntimesGetConnectionInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.getConnectionInfo(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesGetConnectionInfo();
}

main().catch(console.error);
