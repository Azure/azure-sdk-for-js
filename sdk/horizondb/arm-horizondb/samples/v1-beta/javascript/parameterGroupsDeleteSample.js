// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a HorizonDB parameter group. Deletion fails with a conflict when the parameter group is associated with one or more pools.
 *
 * @summary deletes a HorizonDB parameter group. Deletion fails with a conflict when the parameter group is associated with one or more pools.
 * x-ms-original-file: 2026-10-01-preview/ParameterGroups_Delete.json
 */
async function deleteAHorizonDBParameterGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.parameterGroups.delete("example-resource-group", "production-parameters");
}

async function main() {
  await deleteAHorizonDBParameterGroup();
}

main().catch(console.error);
