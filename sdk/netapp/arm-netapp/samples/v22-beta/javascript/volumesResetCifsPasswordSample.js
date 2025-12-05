// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reset cifs password from volume
 *
 * @summary reset cifs password from volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_ResetCifsPassword.json
 */
async function volumesResetCifsPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.resetCifsPassword("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesResetCifsPassword();
}

main().catch(console.error);
