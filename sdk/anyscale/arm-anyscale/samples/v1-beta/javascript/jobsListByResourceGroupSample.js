// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists jobs in a project.
 *
 * @summary lists jobs in a project.
 * x-ms-original-file: 2026-09-01/Jobs_ListByResourceGroup.json
 */
async function jobsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listByResourceGroup(
    "rganyscale",
    "testcloud",
    "testproject",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await jobsListByResourceGroup();
}

main().catch(console.error);
