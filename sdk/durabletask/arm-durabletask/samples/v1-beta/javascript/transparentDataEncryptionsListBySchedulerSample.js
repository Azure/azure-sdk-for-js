// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Transparent Data Encryptions
 *
 * @summary list Transparent Data Encryptions
 * x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_ListByScheduler_MaximumSet_Gen.json
 */
async function transparentDataEncryptionsListBySchedulerMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.transparentDataEncryptions.listByScheduler(
    "rgdurabletask",
    "testscheduler",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await transparentDataEncryptionsListBySchedulerMaximumSet();
}

main().catch(console.error);
