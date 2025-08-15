// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns a cloud specific manifest JSON file with latest version.
 *
 * @summary Returns a cloud specific manifest JSON file with latest version.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CloudManifestFile/List.json
 */
async function returnsThePropertiesOfACloudSpecificManifestFileWithLatestVersion(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.cloudManifestFile.list();
  console.log(result);
}

returnsThePropertiesOfACloudSpecificManifestFileWithLatestVersion().catch(console.error);
