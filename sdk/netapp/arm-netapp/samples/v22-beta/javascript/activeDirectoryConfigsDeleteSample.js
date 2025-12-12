// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified Active Directory configuration
 *
 * @summary delete the specified Active Directory configuration
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_Delete.json
 */
async function activeDirectoryConfigsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.activeDirectoryConfigs.delete("myRG", "adconfig1");
}

async function main() {
  await activeDirectoryConfigsDelete();
}

main().catch(console.error);
