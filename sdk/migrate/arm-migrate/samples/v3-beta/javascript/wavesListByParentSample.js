// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Wave resources by MigrateProject
 *
 * @summary list Wave resources by MigrateProject
 * x-ms-original-file: 2026-06-01-preview/Waves_ListByParent_MaximumSet_Gen.json
 */
async function wavesListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.waves.listByParent("rgwaves", "project1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await wavesListByParentMaximumSet();
}

main().catch(console.error);
