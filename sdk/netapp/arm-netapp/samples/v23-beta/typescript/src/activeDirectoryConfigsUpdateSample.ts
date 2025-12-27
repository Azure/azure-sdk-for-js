// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the specified active directory configuration
 *
 * @summary patch the specified active directory configuration
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_Update.json
 */
async function activeDirectoryConfigsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.activeDirectoryConfigs.update("myRG", "adconfig1", {
    properties: { smbServerName: "smbServer2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await activeDirectoryConfigsUpdate();
}

main().catch(console.error);
