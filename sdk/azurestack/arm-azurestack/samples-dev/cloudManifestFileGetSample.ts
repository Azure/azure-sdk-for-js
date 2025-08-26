// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a cloud specific manifest JSON file.
 *
 * @summary Returns a cloud specific manifest JSON file.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CloudManifestFile/Get.json
 */

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

async function returnsThePropertiesOfACloudSpecificManifestFile(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const verificationVersion = "latest";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.cloudManifestFile.get(verificationVersion);
  console.log(result);
}

returnsThePropertiesOfACloudSpecificManifestFile().catch(console.error);
