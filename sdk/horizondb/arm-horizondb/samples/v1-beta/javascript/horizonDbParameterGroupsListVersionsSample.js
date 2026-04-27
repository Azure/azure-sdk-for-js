// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists parameter groups filtered by version number.
 *
 * @summary lists parameter groups filtered by version number.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListVersions.json
 */
async function listParameterGroupsFilteredByVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbParameterGroups.listVersions(
    "exampleresourcegroup",
    "exampleparametergroup",
    { version: 22 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listParameterGroupsFilteredByVersion();
}

main().catch(console.error);
