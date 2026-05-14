// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get connection parameters for ISCSI connection to the volume group
 *
 * @summary get connection parameters for ISCSI connection to the volume group
 * x-ms-original-file: 2026-01-01-preview/VolumeGroups_ListConnectionParameters_MaximumSet_Gen.json
 */
async function volumeGroupsListConnectionParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroups.listConnectionParameters(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
  );
  console.log(result);
}

async function main() {
  await volumeGroupsListConnectionParameters();
}

main().catch(console.error);
