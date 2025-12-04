// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a subvolume
 *
 * @summary patch a subvolume
 * x-ms-original-file: 2025-09-01-preview/Subvolumes_Update.json
 */
async function subvolumesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.subvolumes.update(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "subvolume1",
    { properties: { path: "/subvolumePath" } },
  );
  console.log(result);
}

async function main() {
  await subvolumesUpdate();
}

main().catch(console.error);
