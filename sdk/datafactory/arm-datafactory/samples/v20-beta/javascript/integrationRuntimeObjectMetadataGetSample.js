// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list.
 *
 * @summary get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeObjectMetadata_Get.json
 */
async function integrationRuntimeObjectMetadataGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeObjectMetadata.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "testactivityv2",
    { getMetadataRequest: { metadataPath: "ssisFolders" } },
  );
  console.log(result);
}

async function main() {
  await integrationRuntimeObjectMetadataGet();
}

main().catch(console.error);
