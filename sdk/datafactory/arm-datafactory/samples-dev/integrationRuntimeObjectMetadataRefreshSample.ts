// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh a SSIS integration runtime object metadata.
 *
 * @summary refresh a SSIS integration runtime object metadata.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeObjectMetadata_Refresh.json
 */
async function integrationRuntimeObjectMetadataRefresh(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeObjectMetadata.refresh(
    "exampleResourceGroup",
    "exampleFactoryName",
    "testactivityv2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimeObjectMetadataRefresh();
}

main().catch(console.error);
