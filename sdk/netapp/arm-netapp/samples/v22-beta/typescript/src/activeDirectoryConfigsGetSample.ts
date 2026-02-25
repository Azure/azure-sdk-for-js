// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details of the specified active directory configuration
 *
 * @summary get the details of the specified active directory configuration
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_Get.json
 */
async function activeDirectoryConfigsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.activeDirectoryConfigs.get("myRG", "adconfig1");
  console.log(result);
}

async function main(): Promise<void> {
  await activeDirectoryConfigsGet();
}

main().catch(console.error);
