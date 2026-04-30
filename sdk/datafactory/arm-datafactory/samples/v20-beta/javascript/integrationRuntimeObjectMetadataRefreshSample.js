// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh a SSIS integration runtime object metadata.
 *
 * @summary refresh a SSIS integration runtime object metadata.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeObjectMetadata_Refresh.json
 */
async function integrationRuntimeObjectMetadataRefresh() {
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

async function main() {
  await integrationRuntimeObjectMetadataRefresh();
}

main().catch(console.error);
