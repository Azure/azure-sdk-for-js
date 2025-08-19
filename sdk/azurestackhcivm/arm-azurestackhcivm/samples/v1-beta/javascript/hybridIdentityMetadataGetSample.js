// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements HybridIdentityMetadata GET method.
 *
 * @summary implements HybridIdentityMetadata GET method.
 * x-ms-original-file: 2025-06-01-preview/HybridIdentityMetadataGroup_Get.json
 */
async function getHybridIdentityMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.hybridIdentityMetadata.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
  console.log(result);
}

async function main() {
  await getHybridIdentityMetadata();
}

main().catch(console.error);
