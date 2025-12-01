// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified Active Directory configuration
 *
 * @summary delete the specified Active Directory configuration
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_Delete.json
 */
async function activeDirectoryConfigsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.activeDirectoryConfigs.delete("myRG", "adconfig1");
}

async function main(): Promise<void> {
  await activeDirectoryConfigsDelete();
}

main().catch(console.error);
