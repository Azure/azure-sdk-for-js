// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified active directory configuration
 *
 * @summary patch the specified active directory configuration
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_Update.json
 */
async function activeDirectoryConfigsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.activeDirectoryConfigs.update("myRG", "adconfig1", {
    properties: { smbServerName: "smbServer2" },
  });
  console.log(result);
}

async function main() {
  await activeDirectoryConfigsUpdate();
}

main().catch(console.error);
